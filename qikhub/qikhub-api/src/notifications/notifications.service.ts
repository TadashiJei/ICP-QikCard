import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  private parseJson(json?: string) {
    if (json === undefined) return undefined;
    if (json === null) return Prisma.JsonNull;
    try {
      return JSON.parse(json);
    } catch (e) {
      throw new BadRequestException('metadata must be valid JSON');
    }
  }

  create(dto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        title: dto.title,
        message: dto.message,
        type: dto.type as any,
        userId: dto.userId,
        isRead: dto.isRead ?? undefined,
        metadata: this.parseJson(dto.metadata),
      },
    });
  }

  async findPaginated(params: {
    userId?: string;
    isRead?: boolean;
    type?: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
    page: number;
    pageSize: number;
  }) {
    const { userId, isRead, type, page, pageSize } = params;
    const where: Prisma.NotificationWhereInput = {
      ...(userId ? { userId } : {}),
      ...(typeof isRead === 'boolean' ? { isRead } : {}),
      ...(type ? { type: type as any } : {}),
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.notification.count({ where }),
      this.prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return { data, total, page, pageSize };
  }

  async findOne(id: string) {
    const item = await this.prisma.notification.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Notification not found');
    return item;
  }

  async update(id: string, dto: UpdateNotificationDto) {
    try {
      return await this.prisma.notification.update({
        where: { id },
        data: {
          title: dto.title,
          message: dto.message,
          type: (dto.type as any) ?? undefined,
          isRead: dto.isRead,
          metadata: this.parseJson(dto.metadata),
        },
      });
    } catch (e) {
      throw new NotFoundException('Notification not found');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.notification.delete({ where: { id } });
      return { success: true };
    } catch (e) {
      throw new NotFoundException('Notification not found');
    }
  }
}
