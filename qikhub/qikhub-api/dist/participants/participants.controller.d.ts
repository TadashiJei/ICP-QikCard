import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
export declare class ParticipantsController {
    private readonly participantsService;
    constructor(participantsService: ParticipantsService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        status: import("@prisma/client").$Enums.ParticipantStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        avatar: string | null;
        phone: string | null;
        customData: import("@prisma/client/runtime/library").JsonValue | null;
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
        customData: import("@prisma/client/runtime/library").JsonValue | null;
        checkedInAt: Date | null;
        checkedOutAt: Date | null;
        eventId: string;
        registrationDate: Date;
    }>;
    create(dto: CreateParticipantDto): import("@prisma/client").Prisma.Prisma__ParticipantClient<{
        name: string;
        status: import("@prisma/client").$Enums.ParticipantStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        avatar: string | null;
        phone: string | null;
        customData: import("@prisma/client/runtime/library").JsonValue | null;
        checkedInAt: Date | null;
        checkedOutAt: Date | null;
        eventId: string;
        registrationDate: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateParticipantDto): Promise<{
        name: string;
        status: import("@prisma/client").$Enums.ParticipantStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        avatar: string | null;
        phone: string | null;
        customData: import("@prisma/client/runtime/library").JsonValue | null;
        checkedInAt: Date | null;
        checkedOutAt: Date | null;
        eventId: string;
        registrationDate: Date;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
