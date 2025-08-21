"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let ParticipantsService = class ParticipantsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.participant.create({
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone ?? undefined,
                avatar: dto.avatar ?? undefined,
                customData: dto.customData === undefined
                    ? undefined
                    : dto.customData === null
                        ? client_1.Prisma.JsonNull
                        : dto.customData,
                status: dto.status ?? undefined,
                checkedInAt: dto.checkedInAt ?? undefined,
                checkedOutAt: dto.checkedOutAt ?? undefined,
                eventId: dto.eventId,
            },
        });
    }
    findAll() {
        return this.prisma.participant.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async findOne(id) {
        const item = await this.prisma.participant.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Participant not found');
        return item;
    }
    async update(id, dto) {
        try {
            return await this.prisma.participant.update({
                where: { id },
                data: {
                    name: dto.name,
                    email: dto.email,
                    phone: dto.phone,
                    avatar: dto.avatar,
                    customData: dto.customData === undefined
                        ? undefined
                        : dto.customData === null
                            ? client_1.Prisma.JsonNull
                            : dto.customData,
                    status: dto.status ?? undefined,
                    checkedInAt: dto.checkedInAt,
                    checkedOutAt: dto.checkedOutAt,
                    eventId: dto.eventId,
                },
            });
        }
        catch (e) {
            throw new common_1.NotFoundException('Participant not found');
        }
    }
    async remove(id) {
        try {
            await this.prisma.participant.delete({ where: { id } });
            return { success: true };
        }
        catch (e) {
            throw new common_1.NotFoundException('Participant not found');
        }
    }
};
exports.ParticipantsService = ParticipantsService;
exports.ParticipantsService = ParticipantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ParticipantsService);
//# sourceMappingURL=participants.service.js.map