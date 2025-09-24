import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';
import { EventFilterDto } from '../common/dto/filter.dto';

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

  async findAllPaginated(pagination: PaginationDto, filters: EventFilterDto) {
    const { page = 1, pageSize = 20 } = pagination;
    const { search, status, organizerId, startDateFrom, startDateTo, sortBy = 'startDate', sortOrder = 'desc' } = filters;

    const where: Prisma.EventWhereInput = {};

    // Apply filters
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { venueName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (organizerId) {
      where.organizerId = organizerId;
    }

    if (startDateFrom || startDateTo) {
      where.startDate = {};
      if (startDateFrom) {
        where.startDate.gte = new Date(startDateFrom);
      }
      if (startDateTo) {
        where.startDate.lte = new Date(startDateTo);
      }
    }

    // Build order by
    const orderBy: Prisma.EventOrderByWithRelationInput = {};
    if (sortBy && ['createdAt', 'updatedAt', 'name', 'startDate', 'endDate'].includes(sortBy)) {
      orderBy[sortBy as keyof Prisma.EventOrderByWithRelationInput] = sortOrder;
    } else {
      orderBy.startDate = sortOrder;
    }

    const [data, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          organizer: {
            select: { id: true, displayName: true, email: true },
          },
          _count: {
            select: { participants: true, devices: true },
          },
        },
      }),
      this.prisma.event.count({ where }),
    ]);

    return new PaginatedResponseDto(data, total, page, pageSize);
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
