import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCheckInDto } from './dto/create-checkin.dto';
import { CheckOutDto } from './dto/checkout.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class CheckinsService {
    private readonly prisma;
    private readonly notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    private parseJson;
    checkIn(dto: CreateCheckInDto): Promise<{
        id: string;
        createdAt: Date;
        eventId: string;
        deviceId: string | null;
        userId: string;
        metadata: Prisma.JsonValue | null;
        participantId: string;
        checkInTime: Date;
        checkOutTime: Date | null;
    }>;
    checkOut(dto: CheckOutDto): Promise<{
        success: boolean;
    }>;
    listByEvent(eventId: string): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        eventId: string;
        deviceId: string | null;
        userId: string;
        metadata: Prisma.JsonValue | null;
        participantId: string;
        checkInTime: Date;
        checkOutTime: Date | null;
    }[]>;
    listByParticipant(participantId: string): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        eventId: string;
        deviceId: string | null;
        userId: string;
        metadata: Prisma.JsonValue | null;
        participantId: string;
        checkInTime: Date;
        checkOutTime: Date | null;
    }[]>;
}
