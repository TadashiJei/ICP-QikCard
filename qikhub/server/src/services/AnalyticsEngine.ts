import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface EventAnalytics {
  eventId: string;
  totalParticipants: number;
  checkedInParticipants: number;
  checkInRate: number;
  totalDevices: number;
  activeDevices: number;
  checkInsByDevice: Array<{
    deviceId: string;
    deviceName: string;
    checkIns: number;
  }>;
  hourlyCheckIns: Array<{
    hour: string;
    checkIns: number;
  }>;
  participantStatus: {
    registered: number;
    checkedIn: number;
    completed: number;
    noShow: number;
  };
}

export interface ParticipantAnalytics {
  totalParticipants: number;
  newParticipants: number;
  returningParticipants: number;
  averageCheckInTime: number;
  topEvents: Array<{
    eventId: string;
    eventName: string;
    participants: number;
  }>;
}

export interface DeviceAnalytics {
  totalDevices: number;
  activeDevices: number;
  totalScans: number;
  scansByDevice: Array<{
    deviceId: string;
    deviceName: string;
    scans: number;
    lastScan: Date;
  }>;
  deviceStatus: {
    active: number;
    inactive: number;
    maintenance: number;
  };
}

class AnalyticsEngine {
  async generateEventAnalytics(eventId: string): Promise<EventAnalytics> {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        participants: true,
        checkIns: {
          include: {
            device: true,
          },
        },
        devices: true,
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    const totalParticipants = event.participants.length;
    const checkedInParticipants = event.checkIns.length;
    const checkInRate = totalParticipants > 0 ? (checkedInParticipants / totalParticipants) * 100 : 0;

    // Check-ins by device
    const checkInsByDevice = await prisma.checkIn.groupBy({
      by: ['deviceId'],
      where: { eventId },
      _count: { id: true },
    });

    const deviceDetails = await Promise.all(
      checkInsByDevice.map(async (group: { deviceId: string; _count: { id: number } }) => {
        const device = await prisma.qikPointDevice.findUnique({
          where: { id: group.deviceId },
        });
        return {
          deviceId: group.deviceId,
          deviceName: device?.name || 'Unknown Device',
          checkIns: group._count.id,
        };
      })
    );

    // Hourly check-ins
    const hourlyCheckIns = await this.getHourlyCheckIns(eventId);

    // Participant status
    const participantStatus = {
      registered: event.participants.filter((p: { status: string }) => p.status === 'REGISTERED').length,
      checkedIn: event.participants.filter((p: { status: string }) => p.status === 'CHECKED_IN').length,
      completed: event.participants.filter((p: { status: string }) => p.status === 'COMPLETED').length,
      noShow: event.participants.filter((p: { status: string }) => p.status === 'NO_SHOW').length,
    };

    return {
      eventId,
      totalParticipants,
      checkedInParticipants,
      checkInRate,
      totalDevices: event.devices.length,
      activeDevices: event.devices.filter((d: { status: string }) => d.status === 'ACTIVE').length,
      checkInsByDevice: deviceDetails,
      hourlyCheckIns,
      participantStatus,
    };
  }

  async generateParticipantAnalytics(participants: any[]): Promise<ParticipantAnalytics> {
    const totalParticipants = participants.length;
    
    // Calculate new vs returning (simplified - based on email)
    const emailCounts = participants.reduce((acc, p) => {
      acc[p.email] = (acc[p.email] || 0) + 1;
      return acc;
    }, {});

    const newParticipants = Object.values(emailCounts).filter(count => count === 1).length;
    const returningParticipants = totalParticipants - newParticipants;

    // Average check-in time (simplified)
    const averageCheckInTime = 0; // Would need more complex calculation

    // Top events by participants
    const topEvents = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        _count: {
          select: { participants: true },
        },
      },
      orderBy: {
        participants: {
          _count: 'desc',
        },
      },
      take: 5,
    });

    return {
      totalParticipants,
      newParticipants,
      returningParticipants,
      averageCheckInTime,
      topEvents: topEvents.map((event: { id: string; title: string; _count: { participants: number } }) => ({
        eventId: event.id,
        eventName: event.title,
        participants: event._count.participants,
      })),
    };
  }

  async generateDeviceAnalytics(devices: any[]): Promise<DeviceAnalytics> {
    const totalDevices = devices.length;
    const activeDevices = devices.filter(d => d.status === 'ACTIVE').length;
    
    // Total scans
    const totalScans = devices.reduce((sum, device) => sum + device.scans.length, 0);

    // Scans by device
    const scansByDevice = devices.map(device => ({
      deviceId: device.id,
      deviceName: device.name,
      scans: device.scans.length,
      lastScan: device.scans[0]?.scannedAt || null,
    }));

    const deviceStatus = {
      active: devices.filter(d => d.status === 'ACTIVE').length,
      inactive: devices.filter(d => d.status === 'INACTIVE').length,
      maintenance: devices.filter(d => d.status === 'MAINTENANCE').length,
    };

    return {
      totalDevices,
      activeDevices,
      totalScans,
      scansByDevice,
      deviceStatus,
    };
  }

  async getCheckInTrends(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const checkIns = await prisma.checkIn.findMany({
      where: {
        event: {
          organizerId: userId,
        },
        scannedAt: {
          gte: startDate,
        },
      },
      select: {
        scannedAt: true,
      },
    });

    // Group by day
    const trends: Record<string, number> = checkIns.reduce((acc: Record<string, number>, checkIn: any) => {
      const date = checkIn.scannedAt.toISOString().split('T')[0];
      acc[date || ''] = (acc[date || ''] || 0) + 1;
      return acc;
    }, {});

    // Fill missing days
    const filledTrends: Array<{ date: string; checkIns: number }> = [];
    const currentEndDate = new Date();
    const currentStartDate = new Date();
    currentStartDate.setDate(currentEndDate.getDate() - 30);
    
    for (let d = new Date(currentStartDate); d <= currentEndDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0] || '';
      filledTrends.push({
        date: dateStr,
        checkIns: trends[dateStr || ''] || 0,
      });
    }

    return filledTrends;
  }

  private async getHourlyCheckIns(eventId: string) {
    const checkIns = await prisma.checkIn.findMany({
      where: { eventId },
      select: {
        scannedAt: true,
      },
    });

    const hourly: { [hour: string]: { hour: string; checkIns: number } } = {};
    for (let i = 0; i < 24; i++) {
      const hourKey = `${i.toString().padStart(2, '0')}:00`;
      hourly[hourKey] = {
        hour: hourKey,
        checkIns: 0,
      };
    }

    checkIns.forEach((checkIn: { scannedAt: Date }) => {
      const hour = checkIn.scannedAt.getHours().toString().padStart(2, '0') + ':00';
      if (hourly[hour]) {
        hourly[hour].checkIns++;
      }
    });

    return Object.values(hourly);
  }
}

export default AnalyticsEngine;
