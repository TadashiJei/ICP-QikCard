# QikHub Architecture Documentation

## Overview

QikHub is the comprehensive web-based management platform for QikCard event organizers, providing real-time event management, QikPoint device configuration, participant monitoring, and analytics.

## System Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                        QikHub Platform                      │
├─────────────────────────────────────────────────────────────┤
│  React Admin Dashboard  │  Node.js API Server  │  QikPoint  │
│  (Next.js + TypeScript) │  (Express + Prisma)  │  Devices   │
├─────────────────────────────────────────────────────────────┤
│                    ICP Backend Canisters                    │
│  auth │ event │ nft │ profile │ analytics │ wallet         │
├─────────────────────────────────────────────────────────────┤
│                    PostgreSQL Database                      │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend (Admin Dashboard)
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + Headless UI
- **State Management**: Zustand + React Query
- **Charts**: Recharts for analytics
- **Real-time**: Socket.io client
- **Authentication**: Internet Identity + JWT

#### Backend (API Server)
- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL 15+ with Prisma ORM
- **Real-time**: Socket.io server
- **Authentication**: JWT tokens + Internet Identity
- **Validation**: Zod schemas
- **Testing**: Jest + Supertest

#### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Deployment**: Railway/Render/Vercel
- **Monitoring**: Prometheus + Grafana
- **Logging**: Winston + Logtail

## Core System Components

### 1. Event Management System
```typescript
interface EventManagement {
  createEvent(config: EventConfig): Promise<Event>
  configureQikPoints(eventId: string, devices: DeviceConfig[]): Promise<void>
  manageRegistrations(eventId: string, settings: RegistrationSettings): Promise<void>
  realTimeUpdates(eventId: string): Observable<EventState>
}
```

### 2. QikPoint Device Management
```typescript
interface DeviceManager {
  registerDevice(device: DeviceRegistration): Promise<Device>
  configureDevice(deviceId: string, config: DeviceConfig): Promise<void>
  monitorDeviceHealth(deviceId: string): Observable<DeviceHealth>
  pushConfiguration(deviceId: string, config: DeviceConfig): Promise<void>
}
```

### 3. Real-time Analytics Engine
```typescript
interface AnalyticsEngine {
  trackEvent(eventId: string, data: AnalyticsData): Promise<void>
  getLiveMetrics(eventId: string): Observable<LiveMetrics>
  generateReport(eventId: string, type: ReportType): Promise<Report>
  exportData(eventId: string, format: ExportFormat): Promise<Buffer>
}
```

### 4. Participant Management
```typescript
interface ParticipantManager {
  registerParticipant(eventId: string, participant: Participant): Promise<void>
  checkInParticipant(eventId: string, participantId: string, deviceId: string): Promise<void>
  trackEngagement(eventId: string, participantId: string): Promise<void>
  getParticipantAnalytics(eventId: string): Promise<ParticipantAnalytics>
}
```

## Data Models

### Event Schema
```typescript
interface Event {
  id: string
  name: string
  description: string
  startDate: Date
  endDate: Date
  venue: VenueInfo
  maxAttendees: number
  status: EventStatus
  qikPoints: QikPointDevice[]
  registrationSettings: RegistrationSettings
  analytics: EventAnalytics
  createdAt: Date
  updatedAt: Date
}

interface VenueInfo {
  name: string
  address: string
  coordinates: { lat: number; lng: number }
  capacity: number
  wifiAvailable: boolean
}

interface RegistrationSettings {
  isOpen: boolean
  maxRegistrations: number
  requireApproval: boolean
  customFields: CustomField[]
}
```

### QikPoint Device Schema
```typescript
interface QikPointDevice {
  id: string
  name: string
  deviceType: 'nfc' | 'qr' | 'hybrid'
  status: DeviceStatus
  location: DeviceLocation
  configuration: DeviceConfig
  health: DeviceHealth
  lastSeen: Date
  firmwareVersion: string
  batteryLevel: number
}

interface DeviceConfig {
  checkInMessage: string
  successSound: boolean
  ledIndicators: boolean
  timeoutSeconds: number
  retryAttempts: number
  customBranding: boolean
}

interface DeviceHealth {
  isOnline: boolean
  batteryLevel: number
  signalStrength: number
  lastHeartbeat: Date
  errorCount: number
}
```

### Analytics Models
```typescript
interface LiveMetrics {
  totalCheckIns: number
  currentAttendees: number
  averageCheckInTime: number
  deviceStatus: DeviceStatus[]
  peakHours: PeakHourData[]
  engagementRate: number
}

interface EventAnalytics {
  totalRegistrations: number
  totalCheckIns: number
  noShowRate: number
  averageEngagementTime: number
  deviceUtilization: DeviceUtilization[]
  participantDemographics: Demographics
}

interface DeviceUtilization {
  deviceId: string
  checkIns: number
  averageProcessingTime: number
  errorRate: number
  uptime: number
}
```

## API Architecture

### RESTful API Endpoints
```
# Events
GET    /api/events              # List all events
POST   /api/events              # Create new event
GET    /api/events/:id          # Get event details
PUT    /api/events/:id          # Update event
DELETE /api/events/:id          # Delete event

# QikPoint Devices
GET    /api/devices             # List all devices
POST   /api/devices             # Register new device
GET    /api/devices/:id         # Get device details
PUT    /api/devices/:id         # Update device config
POST   /api/devices/:id/config  # Push configuration

# Participants
GET    /api/events/:id/participants    # List participants
POST   /api/events/:id/participants    # Register participant
POST   /api/events/:id/checkin         # Check in participant
GET    /api/events/:id/analytics       # Get analytics

# Real-time Updates
GET    /api/events/:id/live            # WebSocket endpoint
```

### WebSocket Events
```typescript
interface WebSocketEvents {
  'event:updated': (event: Event) => void
  'device:status': (deviceId: string, status: DeviceStatus) => void
  'participant:checkin': (participant: Participant) => void
  'analytics:update': (metrics: LiveMetrics) => void
}
```

## Security Architecture

### Authentication Flow
```typescript
interface AuthFlow {
  // Internet Identity integration
  authenticateWithII(): Promise<Identity>
  
  // JWT token generation
  generateToken(identity: Identity): Promise<string>
  
  // Role-based access control
  checkPermission(userId: string, resource: string): Promise<boolean>
}
```

### Data Protection
- **Encryption**: AES-256 for sensitive data
- **HTTPS**: TLS 1.3 for all communications
- **Input Validation**: Zod schemas for all inputs
- **Rate Limiting**: Express-rate-limit
- **CORS**: Configured for secure origins

## Scalability Design

### Horizontal Scaling
- **Load Balancing**: NGINX reverse proxy
- **Database**: Read replicas for analytics
- **Caching**: Redis for session management
- **CDN**: Static assets served via CDN

### Performance Optimization
- **Database Indexing**: Optimized queries
- **Connection Pooling**: PostgreSQL connection limits
- **Caching Strategy**: Multi-level caching
- **Lazy Loading**: Progressive data loading

## Monitoring & Observability

### Metrics Collection
```typescript
interface SystemMetrics {
  apiLatency: number
  databaseConnections: number
  activeWebSocketConnections: number
  deviceHealthScore: number
  eventSuccessRate: number
}
```

### Alerting
- **Health Checks**: Device connectivity
- **Performance**: API response times
- **Security**: Failed authentication attempts
- **Business**: Event capacity thresholds

## Development Workflow

### Local Development
```bash
# Setup
npm install
cp .env.example .env
npm run setup

# Development
npm run dev:server    # Start API server
npm run dev:dashboard # Start admin dashboard
npm run db:migrate    # Run database migrations

# Testing
npm run test          # Run all tests
npm run test:e2e      # Run end-to-end tests
```

### Deployment Pipeline
```bash
# Build
npm run build

# Deploy
npm run deploy:staging
npm run deploy:production

# Monitor
npm run monitor
```

## Integration Points

### ICP Backend Integration
- **Authentication**: Internet Identity verification
- **Event Data**: Sync with ICP event canister
- **NFT Rewards**: Integrate with NFT canister
- **Wallet**: Connect to wallet canister for rewards

### Hardware Integration
- **QikPoint API**: RESTful device communication
- **Real-time Updates**: WebSocket for device status
- **Configuration Push**: Over-the-air updates
- **Health Monitoring**: Continuous device health checks

## Future Enhancements

### Phase 2 Features
- **AI Analytics**: Predictive event insights
- **Mobile App**: Native iOS/Android apps
- **Multi-venue Support**: Complex event management
- **Advanced Reporting**: Custom report builder
- **API Marketplace**: Third-party integrations

### Phase 3 Features
- **Blockchain Analytics**: On-chain event verification
- **DAO Governance**: Community-driven features
- **NFT Marketplace**: Event-based NFT trading
- **Cross-chain Support**: Multi-blockchain integration

This architecture provides a robust, scalable foundation for the QikHub platform while maintaining flexibility for future enhancements and integrations.
