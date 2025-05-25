# 🌱 GLEC API Platform v2

> GLEC Framework 기반 B2B SaaS API 플랫폼 - MCP 통합 자동화

[![GitHub](https://img.shields.io/badge/github-DEOKHOKANG%2Fglec--api--platform--v2-blue)](https://github.com/DEOKHOKANG/glec-api-platform-v2)
[![Node.js](https://img.shields.io/badge/node.js-18+-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.3+-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🚀 빠른 시작

```bash
# 프로젝트 클론
git clone https://github.com/DEOKHOKANG/glec-api-platform-v2.git
cd glec-api-platform-v2

# 환경 변수 설정
cp .env.example .env
# .env 파일에서 필요한 값들 설정

# Docker로 실행 (권장)
docker-compose up -d

# 또는 로컬 개발
npm install
npm run dev
```

## 📁 프로젝트 구조

```
glec-api-platform-v2/
├── api-gateway/          # Express.js API 게이트웨이
│   ├── src/
│   │   ├── routes/       # API 라우터
│   │   ├── middleware/   # 미들웨어
│   │   ├── utils/        # 유틸리티
│   │   └── index.ts      # 메인 서버 파일
│   ├── tests/           # 테스트 파일
│   └── Dockerfile       # Docker 설정
├── services/            # 마이크로서비스들
├── frontend/           # React + Next.js 대시보드
├── shared/            # 공통 타입/유틸리티
├── scripts/           # 개발/배포 스크립트
├── docs/             # API 문서
└── docker-compose.yml # Docker Compose 설정
```

## 🔧 기술 스택

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript (Strict Mode)
- **Database**: Supabase (PostgreSQL)
- **Cache**: Redis
- **Auth**: JWT + API Keys

### Frontend (예정)
- **Framework**: React + Next.js 14
- **UI**: shadcn/ui + Tailwind CSS
- **State**: Zustand
- **Forms**: React Hook Form + Zod

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Winston + Custom metrics

## 🌍 GLEC Framework

이 플랫폼은 [GLEC Framework v3.1](https://www.glecframework.org/)을 기반으로 하여 물류 운송의 탄소 배출량을 정확하게 계산합니다:

- **도로 운송**: 트럭, 밴, 승용차
- **철도 운송**: 화물열차, 여객열차
- **해상 운송**: 컨테이너선, 벌크선
- **항공 운송**: 화물기, 여객기

## 🔗 주요 링크

- **API 문서**: http://localhost:3000/docs (개발 중)
- **Health Check**: http://localhost:3000/health
- **대시보드**: http://localhost:3001 (예정)

## 🧪 API 테스트

```bash
# Health Check
curl http://localhost:3000/health

# API 테스트 (개발 중)
npm run test

# Postman 테스트 (예정)
npm run test:postman
```

## 📊 개발 현황

- ✅ 프로젝트 구조 설계
- ✅ Express.js API Gateway 기본 구현
- 🚧 인증 서비스 구현 중
- ⏳ GLEC 계산 엔진 구현 예정
- ⏳ 프론트엔드 대시보드 구현 예정

**현재 진행률**: 15% (기본 인프라 구축 완료)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 연락처

- **프로젝트 링크**: [https://github.com/DEOKHOKANG/glec-api-platform-v2](https://github.com/DEOKHOKANG/glec-api-platform-v2)
- **이슈 리포트**: [GitHub Issues](https://github.com/DEOKHOKANG/glec-api-platform-v2/issues)

---

**🌱 지속 가능한 물류를 위한 탄소 배출량 계산 플랫폼**
