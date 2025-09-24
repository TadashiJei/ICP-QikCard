import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all devices for authenticated user
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const devices = await prisma.qikPointDevice.findMany({
      where: { userId: req.user?.id },
      include: {
        checkIns: {
          orderBy: { scannedAt: 'desc' },
          take: 10,
          include: {
            participant: true,
          },
        },
      },
    });

    return res.json(devices);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch devices' });
  }
});

// Get single device
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const device = await prisma.qikPointDevice.findFirst({
      where: {
        id: req.params.id,
        userId: req.user?.id,
      },
      include: {
        checkIns: {
          orderBy: { scannedAt: 'desc' },
          take: 20,
          include: {
            participant: true,
          },
        },
      },
    });

    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    return res.json(device);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch device' });
  }
});

// Create new device
router.post('/',
  authenticateToken,
  [
    body('deviceId').isString().notEmpty(),
    body('name').isString().notEmpty(),
    body('eventId').isString().optional(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, deviceId, location } = req.body;

      const device = await prisma.qikPointDevice.create({
        data: {
          name,
          deviceId,
          location,
          userId: req.user?.id,
        },
      });

      return res.status(201).json(device);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create device' });
    }
  });

// Update device
router.put('/:id',
  authenticateToken,
  [
    body('name').isString().optional(),
    body('eventId').isString().optional(),
    body('status').isIn(['ACTIVE', 'INACTIVE', 'MAINTENANCE']).optional(),
    body('lastSeen').isISO8601().optional(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, location } = req.body;

      const device = await prisma.qikPointDevice.findFirst({
        where: {
          id: req.params.id,
          userId: req.user?.id,
        },
      });

      if (!device) {
        return res.status(404).json({ error: 'Device not found' });
      }

      const updatedDevice = await prisma.qikPointDevice.update({
        where: { id: req.params.id },
        data: {
          name: name || device.name,
          location: location || device.location,
        },
      });

      return res.json(updatedDevice);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update device' });
    }
  });

// Delete device
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const device = await prisma.qikPointDevice.findFirst({
      where: {
        id: req.params.id,
        userId: req.user?.id,
      },
    });

    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    await prisma.qikPointDevice.delete({
      where: { id: req.params.id },
    });

    return res.json({ message: 'Device deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete device' });
  }
});

export default router;
