import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEventDto) {
    const event = await this.prisma.event.create({
      data: {
        name: dto.name,
        description: dto.description,
        startDate: dto.startDate,
        endDate: dto.endDate,
        maxAttendees: dto.maxAttendees,
        status: (dto.status as any) ?? undefined,
        venueName: dto.venueName,
        venueAddress: dto.venueAddress,
        venueLat: dto.venueLat ?? null,
        venueLng: dto.venueLng ?? null,
        wifiAvailable: dto.wifiAvailable ?? undefined,
        registrationOpen: dto.registrationOpen ?? undefined,
        requireApproval: dto.requireApproval ?? undefined,
        customFields:
          dto.customFields === undefined
            ? undefined
            : dto.customFields === null
            ? Prisma.JsonNull
            : (dto.customFields as Prisma.InputJsonValue),
        organizerId: dto.organizerId,
      },
    });
    return event;
  }

  async findAll() {
    return this.prisma.event.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async update(id: string, dto: UpdateEventDto) {
    try {
      return await this.prisma.event.update({
        where: { id },
        data: {
          name: dto.name,
          description: dto.description,
          startDate: dto.startDate,
          endDate: dto.endDate,
          maxAttendees: dto.maxAttendees,
          status: (dto.status as any) ?? undefined,
          venueName: dto.venueName,
          venueAddress: dto.venueAddress,
          venueLat: dto.venueLat ?? null,
          venueLng: dto.venueLng ?? null,
          wifiAvailable: dto.wifiAvailable,
          registrationOpen: dto.registrationOpen,
          requireApproval: dto.requireApproval,
          customFields:
            dto.customFields === undefined
              ? undefined
              : dto.customFields === null
              ? Prisma.JsonNull
              : (dto.customFields as Prisma.InputJsonValue),
          organizerId: dto.organizerId,
        },
      });
    } catch (e) {
      // Update throws if not found
      throw new NotFoundException('Event not found');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.event.delete({ where: { id } });
      return { success: true };
    } catch (e) {
      throw new NotFoundException('Event not found');
    }
  }
}
