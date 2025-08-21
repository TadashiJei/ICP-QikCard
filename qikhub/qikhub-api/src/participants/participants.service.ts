import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateParticipantDto) {
    return this.prisma.participant.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone ?? undefined,
        avatar: dto.avatar ?? undefined,
        customData:
          dto.customData === undefined
            ? undefined
            : dto.customData === null
            ? Prisma.JsonNull
            : (dto.customData as Prisma.InputJsonValue),
        status: (dto.status as any) ?? undefined,
        checkedInAt: dto.checkedInAt ?? undefined,
        checkedOutAt: dto.checkedOutAt ?? undefined,
        eventId: dto.eventId,
      },
    });
  }

  findAll() {
    return this.prisma.participant.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const item = await this.prisma.participant.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Participant not found');
    return item;
  }

  async update(id: string, dto: UpdateParticipantDto) {
    try {
      return await this.prisma.participant.update({
        where: { id },
        data: {
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
          avatar: dto.avatar,
          customData:
            dto.customData === undefined
              ? undefined
              : dto.customData === null
              ? Prisma.JsonNull
              : (dto.customData as Prisma.InputJsonValue),
          status: (dto.status as any) ?? undefined,
          checkedInAt: dto.checkedInAt,
          checkedOutAt: dto.checkedOutAt,
          eventId: dto.eventId,
        },
      });
    } catch (e) {
      throw new NotFoundException('Participant not found');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.participant.delete({ where: { id } });
      return { success: true };
    } catch (e) {
      throw new NotFoundException('Participant not found');
    }
  }
}
