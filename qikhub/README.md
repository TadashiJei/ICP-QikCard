# QikHub Management Platform

## Overview

QikHub is the web-based management platform for event organizers to configure QikPoint devices, manage events, monitor participant engagement, and analyze event performance in real-time.

## Platform Architecture

### Technology Stack
- **Backend**: Node.js/Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Frontend**: React/Next.js Admin Dashboard
- **Real-time**: Socket.io for live updates
- **Authentication**: JWT + Internet Identity integration
- **Deployment**: Docker containers on cloud infrastructure

### Project Structure
```
qikhub/
├── server/                # Backend API server
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Authentication, validation
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── utils/         # Helper functions
│   ├── prisma/            # Database schema and migrations
│   └── tests/             # Backend tests
├── dashboard/             # Admin dashboard frontend
│   ├── components/        # React components
│   ├── pages/             # Dashboard pages
│   ├── hooks/             # Custom hooks
│   └── services/          # API client
├── shared/                # Shared types and utilities
├── docs/                  # Platform documentation
└── deployment/            # Docker and deployment configs
```

## Core Features

### 1. Event Management
```typescript
// Event creation and configuration
interface EventConfig {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  venue: VenueInfo;
  activities: Activity[];
  rewards: RewardConfig[];
  qikpoints: QikPointDevice[];
}
```

### 2. Device Management
- **QikPoint Registration**: Add and configure scanner devices
- **Firmware Updates**: Over-the-air updates for all devices
- **Health Monitoring**: Real-time device status and diagnostics
- **Location Mapping**: Visual device placement on venue maps

### 3. Real-time Analytics
```typescript
// Live event metrics
interface EventMetrics {
  participantCount: number;
  interactionsPerHour: number;
  popularActivities: ActivityStats[];
  deviceStatus: DeviceHealth[];
  engagementScore: number;
}
```

### 4. Participant Management
- **Registration**: Bulk participant import/export
- **Profiles**: Individual participant management
- **Communications**: Automated notifications and announcements
- **Support**: Help desk and issue resolution

## Quick Start

### Prerequisites
```bash
# Required software
Node.js >= 18.0.0
PostgreSQL >= 14.0
Docker (optional)
```

### Installation
```bash
cd qikhub

# Install backend dependencies
cd server
npm install

# Install dashboard dependencies  
cd ../dashboard
npm install

# Setup database
cd ../server
npx prisma migrate dev
npx prisma generate
```

### Development
```bash
# Start backend server
cd server
npm run dev

# Start dashboard (separate terminal)
cd dashboard
npm run dev

# Start both with concurrently
npm run dev:all
```

## API Documentation

### Authentication Endpoints
```typescript
POST /auth/login
POST /auth/logout
POST /auth/refresh
GET  /auth/profile
```

### Event Management Endpoints
```typescript
GET    /events              # List all events
POST   /events              # Create new event
GET    /events/:id          # Get event details
PUT    /events/:id          # Update event
DELETE /events/:id          # Delete event
POST   /events/:id/publish  # Publish event
```

### Device Management Endpoints
```typescript
GET    /devices             # List all QikPoint devices
POST   /devices             # Register new device
GET    /devices/:id         # Get device details
PUT    /devices/:id         # Update device config
DELETE /devices/:id         # Remove device
POST   /devices/:id/update  # Trigger firmware update
```

### Analytics Endpoints
```typescript
GET /analytics/events/:id/overview    # Event overview metrics
GET /analytics/events/:id/realtime    # Real-time data stream
GET /analytics/events/:id/participants # Participant analytics
GET /analytics/devices/:id/health     # Device health metrics
```

## Dashboard Components

### Event Dashboard
```typescript
// Real-time event monitoring
const EventDashboard = () => {
  const { data: metrics } = useRealTimeMetrics(eventId);
  const { data: participants } = useParticipants(eventId);
  
  return (
    <div className="dashboard-grid">
      <MetricsOverview metrics={metrics} />
      <ParticipantMap participants={participants} />
      <ActivityFeed activities={metrics.recentActivities} />
      <DeviceStatus devices={metrics.devices} />
    </div>
  );
};
```

### Device Management
```typescript
// QikPoint device configuration
const DeviceManager = () => {
  const { devices, updateDevice } = useDevices();
  
  return (
    <DeviceGrid
      devices={devices}
      onUpdate={updateDevice}
      onConfigChange={handleConfigChange}
    />
  );
};
```

## Real-time Features

### WebSocket Implementation
```typescript
// server/src/services/websocket.ts
import { Server } from 'socket.io';

export class WebSocketService {
  private io: Server;
  
  constructor(server: any) {
    this.io = new Server(server, {
      cors: { origin: process.env.FRONTEND_URL }
    });
    
    this.setupEventHandlers();
  }
  
  private setupEventHandlers() {
    this.io.on('connection', (socket) => {
      socket.on('join-event', (eventId) => {
        socket.join(`event-${eventId}`);
      });
      
      socket.on('subscribe-metrics', (eventId) => {
        this.subscribeToMetrics(socket, eventId);
      });
    });
  }
  
  public broadcastInteraction(eventId: string, interaction: Interaction) {
    this.io.to(`event-${eventId}`).emit('new-interaction', interaction);
  }
}
```

## Database Schema

### Core Tables
```sql
-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  organizer_id UUID NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- QikPoint devices table  
CREATE TABLE qikpoint_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  event_id UUID REFERENCES events(id),
  location JSONB,
  status VARCHAR(50) DEFAULT 'offline',
  last_seen TIMESTAMPTZ
);

-- Interactions table
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID REFERENCES qikpoint_devices(id),
  user_principal VARCHAR(255) NOT NULL,
  interaction_type VARCHAR(100) NOT NULL,
  metadata JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

## Security Features

### Authentication & Authorization
```typescript
// JWT token validation middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401);
  }
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Role-based access control
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.sendStatus(403);
    }
    next();
  };
};
```

## Analytics & Reporting

### Metrics Collection
```typescript
// Analytics service
export class AnalyticsService {
  async getEventMetrics(eventId: string): Promise<EventMetrics> {
    const interactions = await this.getInteractions(eventId);
    const participants = await this.getParticipants(eventId);
    
    return {
      totalInteractions: interactions.length,
      uniqueParticipants: new Set(interactions.map(i => i.userPrincipal)).size,
      averageEngagement: this.calculateEngagement(interactions),
      popularActivities: this.getPopularActivities(interactions),
      hourlyBreakdown: this.getHourlyStats(interactions)
    };
  }
  
  async generateReport(eventId: string, type: ReportType): Promise<Report> {
    const metrics = await this.getEventMetrics(eventId);
    const template = await this.getReportTemplate(type);
    
    return this.renderReport(template, metrics);
  }
}
```

## Testing Strategy

### Backend Testing
```typescript
// Integration tests
describe('Event API', () => {
  beforeEach(async () => {
    await setupTestDatabase();
  });
  
  test('should create new event', async () => {
    const eventData = {
      name: 'Test Event',
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000)
    };
    
    const response = await request(app)
      .post('/events')
      .set('Authorization', `Bearer ${authToken}`)
      .send(eventData)
      .expect(201);
      
    expect(response.body.name).toBe(eventData.name);
  });
});
```

## Deployment

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Build application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Environment Configuration
```bash
# Production environment variables
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@localhost:5432/qikhub
JWT_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379
MQTT_BROKER_URL=mqtt://broker.theqikcard.com
ICP_CANISTER_ENDPOINT=https://ic0.app
```

## Performance Monitoring

### Health Checks
```typescript
// Health check endpoint
app.get('/health', async (req, res) => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    mqtt: await checkMQTT(),
    memory: process.memoryUsage(),
    uptime: process.uptime()
  };
  
  const isHealthy = Object.values(checks).every(check => 
    typeof check === 'object' ? check.status === 'ok' : true
  );
  
  res.status(isHealthy ? 200 : 503).json(checks);
});
```

### Monitoring Metrics
- **Response Times**: Average API response times
- **Error Rates**: HTTP error rate monitoring
- **Database Performance**: Query execution times
- **Real-time Connections**: Active WebSocket connections
- **Device Connectivity**: QikPoint device uptime

---

*QikHub provides event organizers with powerful tools to create engaging, data-driven events while maintaining complete control over the participant experience.*
