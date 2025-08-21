import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDto): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        principalId: string;
        email: string | null;
        displayName: string;
        avatar: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        principalId: string;
        email: string | null;
        displayName: string;
        avatar: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        isActive: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        principalId: string;
        email: string | null;
        displayName: string;
        avatar: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        isActive: boolean;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        principalId: string;
        email: string | null;
        displayName: string;
        avatar: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
