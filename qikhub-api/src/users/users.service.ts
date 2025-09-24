import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';
import { UserFilterDto } from '../common/dto/filter.dto';
import { BulkResponseDto } from '../common/dto/bulk.dto';
import { Prisma } from '@prisma/client';

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

  async findAllPaginated(pagination: PaginationDto, filters: UserFilterDto) {
    const { page = 1, pageSize = 20 } = pagination;
    const { search, role, isActive, sortBy = 'createdAt', sortOrder = 'desc' } = filters;

    const where: Prisma.UserWhereInput = {};

    // Apply filters
    if (search) {
      where.OR = [
        { displayName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.role = role;
    }

    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    // Build order by
    const orderBy: Prisma.UserOrderByWithRelationInput = {};
    if (sortBy && ['createdAt', 'updatedAt', 'displayName', 'email'].includes(sortBy)) {
      orderBy[sortBy as keyof Prisma.UserOrderByWithRelationInput] = sortOrder;
    } else {
      orderBy.createdAt = sortOrder;
    }

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.user.count({ where }),
    ]);

    return new PaginatedResponseDto(data, total, page, pageSize);
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

  async bulkCreate(users: CreateUserDto[]) {
    const success: any[] = [];
    const failed: Array<{ item: CreateUserDto; error: string }> = [];

    for (const user of users) {
      try {
        const created = await this.create(user);
        success.push(created);
      } catch (error: any) {
        failed.push({
          item: user,
          error: error.message || 'Failed to create user',
        });
      }
    }

    return new BulkResponseDto(success, failed);
  }

  async bulkDelete(ids: string[]) {
    const success: Array<{ id: string; deleted: boolean }> = [];
    const failed: Array<{ item: { id: string }; error: string }> = [];

    for (const id of ids) {
      try {
        await this.remove(id);
        success.push({ id, deleted: true });
      } catch (error: any) {
        failed.push({
          item: { id },
          error: error.message || 'Failed to delete user',
        });
      }
    }

    return new BulkResponseDto(success, failed);
  }
}
