import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import winston from 'winston';

// Import routes
import eventRoutes from './routes/events';
import deviceRoutes from './routes/devices';
import participantRoutes from './routes/participants';
import analyticsRoutes from './routes/analytics';
import authRoutes from './routes/auth';
import notificationRoutes from './routes/notifications';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { authenticateToken } from './middleware/auth';
import { validateRequest } from './middleware/validation';

// Import services
import DeviceManager from './services/DeviceManager';
import AnalyticsEngine from './services/AnalyticsEngine';
import NotificationService from './services/NotificationService';
import ICPIntegration from './services/ICPIntegration';

dotenv.config();

// Initialize logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'qikhub-server' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Initialize database
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

// Initialize services
const deviceManager = new DeviceManager(prisma, logger);
const analyticsEngine = new AnalyticsEngine(prisma, logger);
const notificationService = new NotificationService(prisma, logger);
const icpIntegration = new ICPIntegration(logger);

// Initialize Express app
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'connected',
      services: {
        deviceManager: deviceManager.isHealthy(),
        analyticsEngine: analyticsEngine.isHealthy(),
        notificationService: notificationService.isHealthy(),
        icpIntegration: icpIntegration.isHealthy()
      }
    });
  } catch (error) {
    logger.error('Health check failed', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Database connection failed'
    });
  }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/events', authenticateToken, eventRoutes);
app.use('/api/devices', authenticateToken, deviceRoutes);
app.use('/api/participants', authenticateToken, participantRoutes);
app.use('/api/analytics', authenticateToken, analyticsRoutes);
app.use('/api/notifications', authenticateToken, notificationRoutes);

// Socket.io connection handling
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);
  
  // Join event room for real-time updates
  socket.on('join-event', (eventId: string) => {
    socket.join(`event-${eventId}`);
    logger.info(`Client ${socket.id} joined event ${eventId}`);
  });
  
  // Leave event room
  socket.on('leave-event', (eventId: string) => {
    socket.leave(`event-${eventId}`);
    logger.info(`Client ${socket.id} left event ${eventId}`);
  });
  
  // Handle device status updates
  socket.on('device-status', async (data: { deviceId: string, status: any, eventId?: string }) => {
    try {
      await deviceManager.updateDeviceStatus(data.deviceId, data.status);
      if (data.eventId) {
        io.to(`event-${data.eventId}`).emit('device-status-updated', data);
      }
    } catch (error) {
      logger.error('Failed to update device status', error);
      socket.emit('error', { message: 'Failed to update device status' });
    }
  });
  
  // Handle check-in events
  socket.on('participant-checkin', async (data: { eventId: string, participantId: string, deviceId: string }) => {
    try {
      const checkIn = await analyticsEngine.recordCheckIn(data);
      io.to(`event-${data.eventId}`).emit('participant-checked-in', checkIn);
    } catch (error) {
      logger.error('Failed to record check-in', error);
      socket.emit('error', { message: 'Failed to record check-in' });
    }
  });
  
  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  await prisma.$disconnect();
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  await prisma.$disconnect();
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  logger.info(`QikHub server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Export for testing
export { app, server, io, prisma };
