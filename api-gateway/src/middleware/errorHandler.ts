import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';

export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
}

export class APIError extends Error implements AppError {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    Object.setPrototypeOf(this, APIError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  error: Error | AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let details: any = undefined;

  // 로그 레벨 결정
  const isServerError = statusCode >= 500;
  const logLevel = isServerError ? 'error' : 'warn';

  // Zod 유효성 검사 에러
  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    details = {
      issues: error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message,
        received: issue.received
      }))
    };
  }
  // Custom API 에러
  else if ('statusCode' in error && error.statusCode) {
    statusCode = error.statusCode;
    message = error.message;
  }
  // 표준 에러
  else {
    message = error.message || message;
  }

  // 에러 로그 기록
  const errorLog = {
    message: error.message,
    statusCode,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
    ...(isServerError && { stack: error.stack })
  };

  logger[logLevel]('Request error:', errorLog);

  // 응답 구성
  const errorResponse: any = {
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.originalUrl
    }
  };

  // 개발 환경에서는 추가 정보 포함
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = error.stack;
    if (details) {
      errorResponse.error.details = details;
    }
  }

  res.status(statusCode).json(errorResponse);
};

// Async 에러를 위한 래퍼
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};