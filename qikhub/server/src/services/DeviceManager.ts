import { PrismaClient } from '@prisma/client';
import { Logger } from 'winston';
import axios from 'axios';

export interface DeviceConfig {
  checkInMessage: string;
  successSound: boolean;
  ledIndicators: boolean;
  timeoutSeconds: number;
  retryAttempts: number;
  customBranding: boolean;
  welcomeMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}

export interface DeviceHealth {
  isOnline: boolean;
  batteryLevel: number;
  signalStrength: number;
  lastHeartbeat: Date;
  errorCount: number;
  temperature?: number;
  memoryUsage?: number;
  firmwareVersion: string;
}

export class DeviceManager {
  private prisma: PrismaClient;
  private logger: Logger;
  private deviceEndpoints: Map<string, string> = new Map();

  constructor(prisma: PrismaClient, logger: Logger) {
    this.prisma = prisma;
    this.logger = logger;
  }

  async isHealthy(): Promise<boolean> {
    try {
      // Check database connectivity
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      this.logger.error('DeviceManager health check failed', error);
      return false;
    }
  }

  async registerDevice(deviceData: {
    name: string;
    deviceType: 'NFC' | 'QR' | 'HYBRID';
    deviceId: string;
    locationName: string;
    locationLat?: number;
    locationLng?: number;
    ownerId: string;
  }) {
    try {
      const device = await this.prisma.qikPointDevice.create({
        data: {
          ...deviceData,
          configuration: this.getDefaultConfig(),
          healthData: {
            isOnline: false,
            batteryLevel: 100,
            signalStrength: 100,
            errorCount: 0
          }
        }
      });

      this.logger.info(`Device registered: ${device.id}`, { deviceId: device.id });
      return device;
    } catch (error) {
      this.logger.error('Failed to register device', error);
      throw new Error('Failed to register device');
    }
  }

  async getDevice(deviceId: string) {
    return await this.prisma.qikPointDevice.findUnique({
      where: { id: deviceId },
      include: {
        owner: {
          select: { id: true, displayName: true, email: true }
        },
        event: {
          select: { id: true, name: true, status: true }
        }
      }
    });
  }

  async getDevicesByOwner(ownerId: string) {
    return await this.prisma.qikPointDevice.findMany({
      where: { ownerId },
      include: {
        event: {
          select: { id: true, name: true, status: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getDevicesByEvent(eventId: string) {
    return await this.prisma.qikPointDevice.findMany({
      where: { eventId },
      orderBy: { createdAt: 'asc' }
    });
  }

  async updateDevice(deviceId: string, updates: Partial<{
    name: string;
    locationName: string;
    locationLat: number;
    locationLng: number;
    configuration: DeviceConfig;
  }>) {
    try {
      const device = await this.prisma.qikPointDevice.update({
        where: { id: deviceId },
        data: {
          ...updates,
          updatedAt: new Date()
        }
      });

      this.logger.info(`Device updated: ${deviceId}`, updates);
      return device;
    } catch (error) {
      this.logger.error('Failed to update device', error);
      throw new Error('Failed to update device');
    }
  }

  async updateDeviceStatus(deviceId: string, health: Partial<DeviceHealth>) {
    try {
      const device = await this.prisma.qikPointDevice.update({
        where: { id: deviceId },
        data: {
          isOnline: health.isOnline ?? true,
          batteryLevel: health.batteryLevel ?? 100,
          signalStrength: health.signalStrength ?? 100,
          lastSeen: new Date(),
          healthData: {
            ...health,
            lastHeartbeat: new Date()
          }
        }
      });

      this.logger.debug(`Device status updated: ${deviceId}`, health);
      return device;
    } catch (error) {
      this.logger.error('Failed to update device status', error);
      throw new Error('Failed to update device status');
    }
  }

  async configureDevice(deviceId: string, config: DeviceConfig) {
    try {
      const device = await this.prisma.qikPointDevice.update({
        where: { id: deviceId },
        data: {
          configuration: config,
          updatedAt: new Date()
        }
      });

      // Push configuration to device
      await this.pushConfiguration(deviceId, config);

      this.logger.info(`Device configured: ${deviceId}`, config);
      return device;
    } catch (error) {
      this.logger.error('Failed to configure device', error);
      throw new Error('Failed to configure device');
    }
  }

  async pushConfiguration(deviceId: string, config: DeviceConfig) {
    try {
      const device = await this.getDevice(deviceId);
      if (!device) {
        throw new Error('Device not found');
      }

      // Get device endpoint
      const endpoint = this.getDeviceEndpoint(device.deviceId);
      if (!endpoint) {
        throw new Error('Device endpoint not configured');
      }

      // Send configuration to device
      const response = await axios.post(`${endpoint}/config`, {
        deviceId: device.deviceId,
        configuration: config
      }, {
        timeout: 10000,
        headers: {
          'Authorization': `Bearer ${process.env.DEVICE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      this.logger.info(`Configuration pushed to device: ${deviceId}`);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to push configuration to device', error);
      throw new Error('Failed to push configuration to device');
    }
  }

  async getDeviceHealth(deviceId: string): Promise<DeviceHealth> {
    const device = await this.getDevice(deviceId);
    if (!device) {
      throw new Error('Device not found');
    }

    const healthData = device.healthData as any || {};
    return {
      isOnline: device.isOnline,
      batteryLevel: device.batteryLevel,
      signalStrength: device.signalStrength,
      lastHeartbeat: device.lastSeen,
      errorCount: healthData.errorCount || 0,
      temperature: healthData.temperature,
      memoryUsage: healthData.memoryUsage,
      firmwareVersion: device.firmwareVersion
    };
  }

  async assignDeviceToEvent(deviceId: string, eventId: string) {
    try {
      const device = await this.prisma.qikPointDevice.update({
        where: { id: deviceId },
        data: {
          eventId,
          updatedAt: new Date()
        }
      });

      this.logger.info(`Device assigned to event: ${deviceId} -> ${eventId}`);
      return device;
    } catch (error) {
      this.logger.error('Failed to assign device to event', error);
      throw new Error('Failed to assign device to event');
    }
  }

  async unassignDeviceFromEvent(deviceId: string) {
    try {
      const device = await this.prisma.qikPointDevice.update({
        where: { id: deviceId },
        data: {
          eventId: null,
          updatedAt: new Date()
        }
      });

      this.logger.info(`Device unassigned from event: ${deviceId}`);
      return device;
    } catch (error) {
      this.logger.error('Failed to unassign device from event', error);
      throw new Error('Failed to unassign device from event');
    }
  }

  async getDeviceAnalytics(deviceId: string, startDate?: Date, endDate?: Date) {
    const whereClause: any = {
      deviceId
    };

    if (startDate && endDate) {
      whereClause.checkInTime = {
        gte: startDate,
        lte: endDate
      };
    }

    const checkIns = await this.prisma.checkIn.findMany({
      where: whereClause,
      include: {
        participant: {
          select: { name: true, email: true }
        },
        event: {
          select: { name: true }
        }
      },
      orderBy: { checkInTime: 'desc' }
    });

    const totalCheckIns = checkIns.length;
    const uniqueParticipants = new Set(checkIns.map(ci => ci.participantId)).size;
    const averageProcessingTime = totalCheckIns > 0 ? 
      checkIns.reduce((acc, ci) => acc + (ci.metadata?.processingTime || 0), 0) / totalCheckIns : 0;

    return {
      deviceId,
      totalCheckIns,
      uniqueParticipants,
      averageProcessingTime,
      checkIns,
      period: { startDate, endDate }
    };
  }

  private getDefaultConfig(): DeviceConfig {
    return {
      checkInMessage: 'Welcome to the event!',
      successSound: true,
      ledIndicators: true,
      timeoutSeconds: 30,
      retryAttempts: 3,
      customBranding: false,
      welcomeMessage: 'Please tap your card or scan QR code',
      successMessage: 'Check-in successful!',
      errorMessage: 'Check-in failed. Please try again.'
    };
  }

  private getDeviceEndpoint(deviceId: string): string | null {
    // This would typically come from a configuration service
    // For now, use environment variable or default
    return process.env.DEVICE_ENDPOINT || null;
  }
}
