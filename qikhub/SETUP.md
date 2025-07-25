# QikHub Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose
- PostgreSQL 15+ (or use Docker)
- Git

### 1. Environment Setup

```bash
# Clone the repository
git clone <repository-url>
cd qikhub

# Copy environment files
cp server/.env.example server/.env
cp dashboard/.env.example dashboard/.env

# Edit environment variables
# server/.env
DATABASE_URL=postgresql://qikhub:qikhub_password@localhost:5432/qikhub
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
DEVICE_API_KEY=your-device-api-key

# dashboard/.env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

### 2. Docker Setup (Recommended)

```bash
# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 3. Manual Setup

#### Server Setup
```bash
cd server

# Install dependencies
npm install

# Setup database
npm run db:generate
npm run db:migrate
npm run db:seed

# Start development server
npm run dev

# Server runs on http://localhost:3001
```

#### Dashboard Setup
```bash
cd dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Dashboard runs on http://localhost:3000
```

## Development Workflow

### 1. Database Management

```bash
# Create new migration
npm run db:migrate:dev --name add-new-feature

# Reset database
npm run db:reset

# Seed with test data
npm run db:seed

# Generate Prisma client
npm run db:generate
```

### 2. Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- auth.test.ts
```

### 3. Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

## Configuration

### Server Configuration

#### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/qikhub

# Authentication
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info

# ICP Integration
ICP_NETWORK_URL=https://ic0.app
ICP_CANISTER_ID=your-canister-id

# Device API
DEVICE_API_KEY=your-device-api-key
DEVICE_ENDPOINT=http://localhost:8080
```

#### Database Configuration
```bash
# PostgreSQL setup
psql -U postgres
create database qikhub;
create user qikhub with password 'qikhub_password';
grant all privileges on database qikhub to qikhub;
```

### Dashboard Configuration

#### Environment Variables
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Authentication
NEXT_PUBLIC_AUTH_DOMAIN=your-auth-domain

# Analytics
NEXT_PUBLIC_GA_TRACKING_ID=your-ga-id

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

## Deployment

### 1. Production Build

```bash
# Build server
cd server
npm run build

# Build dashboard
cd dashboard
npm run build
```

### 2. Docker Production

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Cloud Deployment

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Vercel (Dashboard)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy dashboard
vercel --prod
```

#### Render (Server)
```bash
# Connect GitHub repository
# Configure environment variables
# Deploy automatically on push
```

## Troubleshooting

### Common Issues

#### Database Connection
```bash
# Check PostgreSQL service
systemctl status postgresql

# Test connection
psql -h localhost -U qikhub -d qikhub

# Reset database
docker-compose down -v
docker-compose up -d
```

#### Port Conflicts
```bash
# Check port usage
lsof -i :3000
lsof -i :3001
lsof -i :5432

# Kill processes
kill -9 <PID>
```

#### Docker Issues
```bash
# Reset Docker
docker system prune -a

# Rebuild containers
docker-compose build --no-cache
docker-compose up -d
```

### Development Tools

#### Database GUI
```bash
# Install pgAdmin
# Connect to localhost:5432
# Database: qikhub
# User: qikhub
# Password: qikhub_password
```

#### API Testing
```bash
# Install Postman or use curl
curl http://localhost:3001/health
```

#### WebSocket Testing
```bash
# Use wscat for WebSocket testing
npm install -g wscat
wscat -c ws://localhost:3001
```

## Development Features

### Hot Reload
- Server: Nodemon for auto-restart
- Dashboard: Next.js hot reload
- Database: Prisma generate on save

### Debugging
- Server: VS Code debugger configuration
- Dashboard: React DevTools
- Database: Prisma Studio

### Monitoring
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3003 (admin/admin)
- Logs: Docker logs or Winston logs

## Next Steps

1. **Setup Complete**: All services should be running
2. **Access Dashboard**: http://localhost:3000
3. **Test API**: http://localhost:3001/health
4. **Database**: Use Prisma Studio or pgAdmin
5. **Monitor**: Check Grafana dashboards

## Support

- **Documentation**: Check docs/ directory
- **Issues**: Create GitHub issues
- **Discord**: Join our community server
- **Email**: support@qikcard.com
