import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth';
import NotificationService from '../services/NotificationService';

const router = Router();
const prisma = new PrismaClient();
const notificationService = new NotificationService();

// Get user's notifications
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user?.id },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(notifications);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Get unread notifications count
router.get('/unread', authenticateToken, async (req: Request, res: Response) => {
  try {
    const unreadCount = await prisma.notification.count({
      where: {
        userId: req.user?.id,
        isRead: false,
      },
    });

    return res.json({ unreadCount });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch unread count' });
  }
});

// Mark notification as read
router.put('/:id/read', authenticateToken, async (req: Request, res: Response) => {
  try {
    const notification = await prisma.notification.findFirst({
      where: {
        id: req.params.id,
        userId: req.user?.id,
      },
    });

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    const updatedNotification = await prisma.notification.update({
      where: { id: req.params.id },
      data: { isRead: true },
    });

    return res.json(updatedNotification);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to mark as read' });
  }
});

// Mark all notifications as read
router.put('/mark-all-read', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.notification.updateMany({
      where: {
        userId: req.user?.id,
        isRead: false,
      },
      data: { isRead: true },
    });

    return res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to mark all as read' });
  }
});

// Create notification (for testing)
router.post('/',
  authenticateToken,
  [
    body('title').isString().notEmpty(),
    body('message').isString().notEmpty(),
    body('userId').isString().optional(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, message, type, userIds } = req.body;

      const notificationService = new NotificationService();
      
      for (const userId of userIds) {
        await notificationService.sendPushNotification(userId, {
          title,
          message: message || 'You have a new notification',
        });
      }

      return res.json({ message: 'Notification sent successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to send notification' });
    }
  }
);

// Send push notification
router.post('/push',
  authenticateToken,
  [
    body('title').isString().notEmpty(),
    body('message').isString().notEmpty(),
    body('userId').isString().optional(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, message, userId } = req.body;
      const targetUserId = userId || req.user.id;

      await notificationService.sendPushNotification(targetUserId, {
        title,
        message,
      });

      return res.json({ message: 'Push notification sent' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to send push notification' });
    }
  }
);

// Delete notification
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const notification = await prisma.notification.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    await prisma.notification.delete({
      where: { id: req.params.id },
    });

    return res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete notification' });
  }
});

export default router;
