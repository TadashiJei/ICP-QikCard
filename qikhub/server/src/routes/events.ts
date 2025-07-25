import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all events for authenticated user
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      where: { organizerId: req.user?.id },
      include: {
        participants: {
          include: {
            checkIns: true,
          },
        },
        devices: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(events);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get single event
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.findFirst({
      where: {
        id: req.params.id,
        organizerId: req.user?.id,
      },
      include: {
        participants: {
          include: {
            checkIns: true,
          },
        },
        devices: true,
      },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.json(event);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Create new event
router.post('/', 
  authenticateToken,
  [
    body('title').isString().notEmpty(),
    body('description').isString().optional(),
    body('startDate').isISO8601(),
    body('endDate').isISO8601(),
    body('location').isString().optional(),
    body('maxParticipants').isInt({ min: 1 }).optional(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, startDate, endDate, location, settings } = req.body;

      const event = await prisma.event.create({
        data: {
          title,
          description,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          location,
          settings: settings || {},
          organizerId: req.user?.id,
        },
        include: {
          participants: true,
          devices: true,
        },
      });

      return res.status(201).json(event);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create event' });
    }
  });

// Update event
router.put('/:id',
  authenticateToken,
  [
    body('title').isString().optional(),
    body('description').isString().optional(),
    body('startDate').isISO8601().optional(),
    body('endDate').isISO8601().optional(),
    body('location').isString().optional(),
    body('maxParticipants').isInt({ min: 1 }).optional(),
    body('status').isIn(['DRAFT', 'PUBLISHED', 'LIVE', 'COMPLETED', 'CANCELLED']).optional(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, startDate, endDate, location, settings } = req.body;

      const event = await prisma.event.findFirst({
        where: {
          id: req.params.id,
          organizerId: req.user?.id,
        },
      });

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      const updatedEvent = await prisma.event.update({
        where: { id: req.params.id },
        data: {
          title: title || event.title,
          description: description || event.description,
          startDate: startDate ? new Date(startDate) : event.startDate,
          endDate: endDate ? new Date(endDate) : event.endDate,
          location: location || event.location,
          settings: settings || event.settings,
        },
        include: {
          participants: true,
          devices: true,
        },
      });

      return res.json(updatedEvent);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update event' });
    }
  });

// Delete event
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.findFirst({
      where: {
        id: req.params.id,
        organizerId: req.user?.id,
      },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    await prisma.event.delete({
      where: { id: req.params.id },
    });

    return res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router;
