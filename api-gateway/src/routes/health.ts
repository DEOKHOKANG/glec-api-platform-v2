import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { logger } from '../utils/logger';

const router = Router();

// Supabase 클라이언트
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

/**
 * @openapi
 * /health:
 *   get:
 *     tags: [System]
 *     summary: 시스템 상태 확인
 *     description: API 게이트웨이와 데이터베이스 연결 상태를 확인합니다.
 *     responses:
 *       200:
 *         description: 시스템 정상 상태
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 environment:
 *                   type: string
 *                   example: "development"
 *                 database:
 *                   type: string
 *                   example: "connected"
 *                 uptime:
 *                   type: number
 *                   example: 3600
 *       503:
 *         description: 서비스 이용 불가 (데이터베이스 연결 실패)
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    // 데이터베이스 연결 테스트
    let databaseStatus = 'disconnected';
    try {
      const { data, error } = await supabase
        .from('health_check')
        .select('status')
        .limit(1);
      
      if (!error) {
        databaseStatus = 'connected';
      }
    } catch (dbError) {
      logger.warn('Database health check failed:', dbError);
    }

    const healthData = {
      status: databaseStatus === 'connected' ? 'OK' : 'DEGRADED',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: databaseStatus,
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      }
    };

    const statusCode = databaseStatus === 'connected' ? 200 : 503;
    res.status(statusCode).json(healthData);

  } catch (error) {
    logger.error('Health check error:', error);
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: 'Internal server error during health check'
    });
  }
});

export { router as healthRouter };