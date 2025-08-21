import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private parseJson;
    create(dto: CreateNotificationDto): Prisma.Prisma__NotificationClient<{
        id: string;
        createdAt: Date;
        title: string;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        userId: string;
        isRead: boolean;
        metadata: Prisma.JsonValue | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        title: string;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        userId: string;
        isRead: boolean;
        metadata: Prisma.JsonValue | null;
    }[]>;
    findByUser(userId: string): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        title: string;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        userId: string;
        isRead: boolean;
        metadata: Prisma.JsonValue | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        userId: string;
        isRead: boolean;
        metadata: Prisma.JsonValue | null;
    }>;
    update(id: string, dto: UpdateNotificationDto): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        userId: string;
        isRead: boolean;
        metadata: Prisma.JsonValue | null;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
