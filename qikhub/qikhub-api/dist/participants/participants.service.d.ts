import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
export declare class ParticipantsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateParticipantDto): Prisma.Prisma__ParticipantClient<{
        name: string;
        status: import("@prisma/client").$Enums.ParticipantStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        avatar: string | null;
        phone: string | null;
        customData: Prisma.JsonValue | null;
        checkedInAt: Date | null;
        checkedOutAt: Date | null;
        eventId: string;
        registrationDate: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<{
        name: string;
        status: import("@prisma/client").$Enums.ParticipantStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        avatar: string | null;
        phone: string | null;
        customData: Prisma.JsonValue | null;
        checkedInAt: Date | null;
        checkedOutAt: Date | null;
        eventId: string;
        registrationDate: Date;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        status: import("@prisma/client").$Enums.ParticipantStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        avatar: string | null;
        phone: string | null;
        customData: Prisma.JsonValue | null;
        checkedInAt: Date | null;
        checkedOutAt: Date | null;
        eventId: string;
        registrationDate: Date;
    }>;
    update(id: string, dto: UpdateParticipantDto): Promise<{
        name: string;
        status: import("@prisma/client").$Enums.ParticipantStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        avatar: string | null;
        phone: string | null;
        customData: Prisma.JsonValue | null;
        checkedInAt: Date | null;
        checkedOutAt: Date | null;
        eventId: string;
        registrationDate: Date;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
