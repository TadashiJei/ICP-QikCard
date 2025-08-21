import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        principalId: dto.principalId,
        email: dto.email ?? undefined,
        displayName: dto.displayName,
        avatar: dto.avatar ?? undefined,
        role: (dto.role as any) ?? undefined,
        isActive: dto.isActive ?? undefined,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          principalId: dto.principalId,
          email: dto.email,
          displayName: dto.displayName,
          avatar: dto.avatar,
          role: (dto.role as any) ?? undefined,
          isActive: dto.isActive,
        },
      });
    } catch (e) {
      throw new NotFoundException('User not found');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return { success: true };
    } catch (e) {
      throw new NotFoundException('User not found');
    }
  }
}
