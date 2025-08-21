import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(userId?: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        title: string;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        userId: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        userId: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    create(dto: CreateNotificationDto): import("@prisma/client").Prisma.Prisma__NotificationClient<{
        id: string;
        createdAt: Date;
        title: string;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        userId: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateNotificationDto): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        userId: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
