import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DevicePingDto } from './dto/ping.dto';

@Injectable()
export class DevicesService {
  constructor(private readonly prisma: PrismaService) {}

  private parseConfiguration(json?: string) {
    if (json === undefined) return undefined;
    if (json === null) return Prisma.JsonNull;
    try {
      return JSON.parse(json);
    } catch (e) {
      throw new BadRequestException('configuration must be a valid JSON string');
    }
  }

  async create(dto: CreateDeviceDto) {
    try {
      return await this.prisma.qikPointDevice.create({
        data: {
          name: dto.name,
          deviceType: dto.deviceType as any,
          deviceId: dto.deviceId,
          status: (dto.status as any) ?? undefined,
          locationName: dto.locationName,
          locationLat: dto.locationLat ?? undefined,
          locationLng: dto.locationLng ?? undefined,
          firmwareVersion: dto.firmwareVersion,
          batteryLevel: dto.batteryLevel ?? undefined,
          signalStrength: dto.signalStrength ?? undefined,
          isOnline: dto.isOnline ?? undefined,
          ownerId: dto.ownerId,
          eventId: dto.eventId ?? undefined,
          configuration: this.parseConfiguration(dto.configuration),
        },
      });
    } catch (e: any) {
      if (e && e.code === 'P2002') {
        throw new ConflictException('deviceId must be unique');
      }
      throw e;
    }
  }

  findAll(filters?: { ownerId?: string; eventId?: string }) {
    const where: Prisma.QikPointDeviceWhereInput = {};
    if (filters?.ownerId) where.ownerId = filters.ownerId;
    if (filters?.eventId) where.eventId = filters.eventId;
    return this.prisma.qikPointDevice.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  findByOwner(ownerId: string) {
    return this.findAll({ ownerId });
  }

  findByEvent(eventId: string) {
    return this.findAll({ eventId });
  }

  async findOne(id: string) {
    const item = await this.prisma.qikPointDevice.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Device not found');
    return item;
    }

  async update(id: string, dto: UpdateDeviceDto) {
    try {
      return await this.prisma.qikPointDevice.update({
        where: { id },
        data: {
          name: dto.name,
          deviceType: (dto.deviceType as any) ?? undefined,
          deviceId: dto.deviceId,
          status: (dto.status as any) ?? undefined,
          locationName: dto.locationName,
          locationLat: dto.locationLat,
          locationLng: dto.locationLng,
          firmwareVersion: dto.firmwareVersion,
          batteryLevel: dto.batteryLevel,
          signalStrength: dto.signalStrength,
          isOnline: dto.isOnline,
          ownerId: dto.ownerId,
          eventId: dto.eventId,
          configuration: this.parseConfiguration(dto.configuration),
        },
      });
    } catch (e) {
      throw new NotFoundException('Device not found');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.qikPointDevice.delete({ where: { id } });
      return { success: true };
    } catch (e) {
      throw new NotFoundException('Device not found');
    }
  }

  async assignEvent(id: string, eventId: string) {
    try {
      return await this.prisma.qikPointDevice.update({ where: { id }, data: { eventId } });
    } catch (e) {
      throw new NotFoundException('Device not found');
    }
  }

  async unassignEvent(id: string) {
    try {
      return await this.prisma.qikPointDevice.update({ where: { id }, data: { eventId: null } });
    } catch (e) {
      throw new NotFoundException('Device not found');
    }
  }

  async ping(id: string, dto: DevicePingDto) {
    const now = new Date();
    try {
      return await this.prisma.qikPointDevice.update({
        where: { id },
        data: {
          lastSeen: now,
          batteryLevel: dto.batteryLevel ?? undefined,
          signalStrength: dto.signalStrength ?? undefined,
          isOnline: dto.isOnline ?? undefined,
          healthData: dto.healthData ? this.parseConfiguration(dto.healthData) : undefined,
        },
      });
    } catch (e) {
      throw new NotFoundException('Device not found');
    }
  }
}
