import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all participants for authenticated user's events
router.get('/', authenticateToken, async (req, res) => {
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
        nfts: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch participants' });
  }
});

// Get single participant
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const participant = await prisma.participant.findFirst({
      where: {
        id: req.params.id,
        event: {
          organizerId: req.user.id,
        },
      },
      include: {
        event: true,
        checkIns: {
          include: {
            device: true,
          },
        },
        nfts: true,
      },
    });

    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }

    return res.json(participant);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch participant' });
  }
});

// Register new participant
router.post('/',
  authenticateToken,
  [
    body('eventId').isString().notEmpty(),
    body('name').isString().notEmpty(),
    body('email').isEmail().optional(),
    body('phone').isString().optional(),
    body('walletAddress').isString().optional(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Verify the event belongs to the user
      const event = await prisma.event.findFirst({
        where: {
          id: req.body.eventId,
          organizerId: req.user?.id,
        },
      });

      if (!event) {
        return res.status(404).json({ error: 'Event not found or access denied' });
      }

      const participant = await prisma.participant.create({
        data: {
          eventId: req.body.eventId,
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          walletAddress: req.body.walletAddress,
        },
      });

      return res.status(201).json(participant);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create participant' });
    }
  }
);

// Update participant
router.put('/:id',
  authenticateToken,
  [
    body('name').isString().optional(),
    body('email').isEmail().optional(),
    body('phone').isString().optional(),
    body('walletAddress').isString().optional(),
    body('status').isIn(['REGISTERED', 'CHECKED_IN', 'COMPLETED', 'NO_SHOW']).optional(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const participant = await prisma.participant.findUnique({
        where: { id: req.params.id },
        include: { event: true },
      });

      if (!participant) {
        return res.status(404).json({ error: 'Participant not found' });
      }

      if (participant.event.organizerId !== req.user?.id) {
        return res.status(403).json({ error: 'Access denied' });
      }

      const updatedParticipant = await prisma.participant.update({
        where: { id: req.params.id },
        data: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          walletAddress: req.body.walletAddress,
        },
      });

      return res.json(updatedParticipant);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update participant' });
    }
  }
);

// Delete participant
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const participant = await prisma.participant.findUnique({
      where: { id: req.params.id },
      include: { event: true },
    });

    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }

    // Check if user owns the event
    if (participant.event.organizerId !== req.user?.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await prisma.participant.delete({
      where: { id: req.params.id },
    });

    return res.json({ message: 'Participant deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete participant' });
  }
});

export default router;
