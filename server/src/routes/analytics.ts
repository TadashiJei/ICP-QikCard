import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';
import AnalyticsEngine from '../services/AnalyticsEngine';

const router = Router();
const prisma = new PrismaClient();
const analyticsEngine = new AnalyticsEngine();

// Get dashboard analytics
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const [
      totalEvents,
      totalParticipants,
      totalCheckIns,
      activeDevices,
      recentEvents,
    ] = await Promise.all([
      prisma.event.count({
        where: { organizerId: userId },
      }),
      prisma.participant.count({
        where: {
          event: {
            organizerId: userId,
          },
        },
      }),
      prisma.checkIn.count({
        where: {
          event: {
            organizerId: userId,
          },
        },
      }),
      prisma.qikPointDevice.count({
        where: {
          organizerId: userId,
          status: 'ACTIVE',
        },
      }),
      prisma.event.findMany({
        where: { organizerId: userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          _count: {
            select: {
              participants: true,
              checkIns: true,
            },
          },
        },
      }),
    ]);

    res.json({
      totalEvents,
      totalParticipants,
      totalCheckIns,
      activeDevices,
      recentEvents,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard analytics' });
  }
});

// Get event analytics
router.get('/events/:eventId', authenticateToken, async (req, res) => {
  try {
    const event = await prisma.event.findFirst({
      where: {
        id: req.params.eventId,
        organizerId: req.user.id,
      },
      include: {
        participants: true,
        checkIns: {
          include: {
            participant: true,
            device: true,
          },
        },
        devices: true,
      },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const analytics = await analyticsEngine.generateEventAnalytics(event.id);
    return res.json(analytics);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch event analytics' });
  }
});

// Get participant analytics
router.get('/participants', authenticateToken, async (req, res) => {
  try {
    const participants = await prisma.participant.findMany({
      where: {
        event: {
          organizerId: req.user.id,
        },
      },
      include: {
        event: true,
        checkIns: true,
      },
    });

    const analytics = await analyticsEngine.generateParticipantAnalytics(participants);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch participant analytics' });
  }
});

// Get device analytics
router.get('/devices', authenticateToken, async (req, res) => {
  try {
    const devices = await prisma.qikPointDevice.findMany({
      where: { organizerId: req.user.id },
      include: {
        scans: {
          include: {
            participant: true,
          },
        },
        event: true,
      },
    });

    const analytics = await analyticsEngine.generateDeviceAnalytics(devices);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch device analytics' });
  }
});

// Get check-in trends
router.get('/checkins/trends', authenticateToken, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const daysNum = parseInt(days as string, 10);
    
    const trends = await analyticsEngine.getCheckInTrends(req.user.id, daysNum);
    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch check-in trends' });
  }
});

export default router;
