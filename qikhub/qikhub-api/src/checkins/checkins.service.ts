import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCheckInDto } from './dto/create-checkin.dto';
import { CheckOutDto } from './dto/checkout.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class CheckinsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
  ) {}

  private parseJson(json?: string) {
    if (json === undefined) return undefined;
    if (json === null) return Prisma.JsonNull;
    try {
      return JSON.parse(json);
    } catch (e) {
      throw new BadRequestException('metadata must be valid JSON');
    }
  }

  async checkIn(dto: CreateCheckInDto) {
    // Ensure participant belongs to the event
    const participant = await this.prisma.participant.findFirst({
      where: { id: dto.participantId, eventId: dto.eventId },
    });
    if (!participant) throw new NotFoundException('Participant not found for event');

    const now = new Date();

    const checkIn = await this.prisma.checkIn.create({
      data: {
        checkInTime: now,
        eventId: dto.eventId,
        participantId: dto.participantId,
        userId: dto.userId,
        deviceId: dto.deviceId ?? undefined,
        metadata: this.parseJson(dto.metadata),
      },
    });

    await this.prisma.participant.update({
      where: { id: dto.participantId },
      data: { status: 'CHECKED_IN' as any, checkedInAt: now },
    });

    // Emit notification to operator
    await this.notifications.create({
      title: 'Check-In',
      message: `Participant ${participant.name} checked in`,
      type: 'SUCCESS',
      userId: dto.userId,
      isRead: false,
    });

    return checkIn;
  }

  async checkOut(dto: CheckOutDto) {
    const participant = await this.prisma.participant.findFirst({
      where: { id: dto.participantId, eventId: dto.eventId },
    });
    if (!participant) throw new NotFoundException('Participant not found for event');

    const open = await this.prisma.checkIn.findFirst({
      where: { participantId: dto.participantId, eventId: dto.eventId, checkOutTime: null },
      orderBy: { checkInTime: 'desc' },
    });

    const now = new Date();

    if (!open) {
      // If there is no open check-in, create a completed record
      await this.prisma.checkIn.create({
        data: {
          checkInTime: now,
          checkOutTime: now,
          eventId: dto.eventId,
          participantId: dto.participantId,
          userId: dto.userId,
          deviceId: dto.deviceId ?? undefined,
          metadata: this.parseJson(dto.metadata),
        },
      });
    } else {
      await this.prisma.checkIn.update({
        where: { id: open.id },
        data: {
          checkOutTime: now,
          // prefer provided metadata on checkout if any
          metadata: dto.metadata ? this.parseJson(dto.metadata) : open.metadata,
        },
      });
    }

    await this.prisma.participant.update({
      where: { id: dto.participantId },
      data: { status: 'CHECKED_OUT' as any, checkedOutAt: now },
    });

    await this.notifications.create({
      title: 'Check-Out',
      message: `Participant ${participant.name} checked out`,
      type: 'INFO',
      userId: dto.userId,
      isRead: false,
    });

    return { success: true };
  }

  async listByEvent(eventId: string, page = 1, pageSize = 20) {
    const where: Prisma.CheckInWhereInput = { eventId };
    const [total, data] = await this.prisma.$transaction([
      this.prisma.checkIn.count({ where }),
      this.prisma.checkIn.findMany({
        where,
        orderBy: { checkInTime: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);
    return { data, total, page, pageSize };
  }

  async listByParticipant(participantId: string, page = 1, pageSize = 20) {
    const where: Prisma.CheckInWhereInput = { participantId };
    const [total, data] = await this.prisma.$transaction([
      this.prisma.checkIn.count({ where }),
      this.prisma.checkIn.findMany({
        where,
        orderBy: { checkInTime: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);
    return { data, total, page, pageSize };
  }
}
