import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
