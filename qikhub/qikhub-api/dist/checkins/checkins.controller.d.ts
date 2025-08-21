import { CheckinsService } from './checkins.service';
import { CreateCheckInDto } from './dto/create-checkin.dto';
import { CheckOutDto } from './dto/checkout.dto';
export declare class CheckinsController {
    private readonly checkinsService;
    constructor(checkinsService: CheckinsService);
    checkIn(dto: CreateCheckInDto): Promise<{
        id: string;
        createdAt: Date;
        eventId: string;
        deviceId: string | null;
        userId: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        participantId: string;
        checkInTime: Date;
        checkOutTime: Date | null;
    }>;
    checkOut(dto: CheckOutDto): Promise<{
        success: boolean;
    }>;
    listByEvent(eventId: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        eventId: string;
        deviceId: string | null;
        userId: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        participantId: string;
        checkInTime: Date;
        checkOutTime: Date | null;
    }[]>;
    listByParticipant(participantId: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        eventId: string;
        deviceId: string | null;
        userId: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        participantId: string;
        checkInTime: Date;
        checkOutTime: Date | null;
    }[]>;
}
