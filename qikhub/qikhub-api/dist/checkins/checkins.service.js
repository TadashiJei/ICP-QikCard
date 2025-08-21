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
exports.CheckinsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let CheckinsService = class CheckinsService {
    prisma;
    notifications;
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    parseJson(json) {
        if (json === undefined)
            return undefined;
        if (json === null)
            return client_1.Prisma.JsonNull;
        try {
            return JSON.parse(json);
        }
        catch (e) {
            throw new common_1.BadRequestException('metadata must be valid JSON');
        }
    }
    async checkIn(dto) {
        const participant = await this.prisma.participant.findFirst({
            where: { id: dto.participantId, eventId: dto.eventId },
        });
        if (!participant)
            throw new common_1.NotFoundException('Participant not found for event');
        const now = new Date();
        const checkIn = await this.prisma.checkIn.create({
            data: {
                checkInTime: now,
                eventId: dto.eventId,
                participantId: dto.participantId,
                userId: dto.userId,
                deviceId: dto.deviceId ?? undefined,
                metadata: this.parseJson(dto.metadata),
            },
        });
        await this.prisma.participant.update({
            where: { id: dto.participantId },
            data: { status: 'CHECKED_IN', checkedInAt: now },
        });
        await this.notifications.create({
            title: 'Check-In',
            message: `Participant ${participant.name} checked in`,
            type: 'SUCCESS',
            userId: dto.userId,
            isRead: false,
        });
        return checkIn;
    }
    async checkOut(dto) {
        const participant = await this.prisma.participant.findFirst({
            where: { id: dto.participantId, eventId: dto.eventId },
        });
        if (!participant)
            throw new common_1.NotFoundException('Participant not found for event');
        const open = await this.prisma.checkIn.findFirst({
            where: { participantId: dto.participantId, eventId: dto.eventId, checkOutTime: null },
            orderBy: { checkInTime: 'desc' },
        });
        const now = new Date();
        if (!open) {
            await this.prisma.checkIn.create({
                data: {
                    checkInTime: now,
                    checkOutTime: now,
                    eventId: dto.eventId,
                    participantId: dto.participantId,
                    userId: dto.userId,
                    deviceId: dto.deviceId ?? undefined,
                    metadata: this.parseJson(dto.metadata),
                },
            });
        }
        else {
            await this.prisma.checkIn.update({
                where: { id: open.id },
                data: {
                    checkOutTime: now,
                    metadata: dto.metadata ? this.parseJson(dto.metadata) : open.metadata,
                },
            });
        }
        await this.prisma.participant.update({
            where: { id: dto.participantId },
            data: { status: 'CHECKED_OUT', checkedOutAt: now },
        });
        await this.notifications.create({
            title: 'Check-Out',
            message: `Participant ${participant.name} checked out`,
            type: 'INFO',
            userId: dto.userId,
            isRead: false,
        });
        return { success: true };
    }
    listByEvent(eventId) {
        return this.prisma.checkIn.findMany({ where: { eventId }, orderBy: { checkInTime: 'desc' } });
    }
    listByParticipant(participantId) {
        return this.prisma.checkIn.findMany({ where: { participantId }, orderBy: { checkInTime: 'desc' } });
    }
};
exports.CheckinsService = CheckinsService;
exports.CheckinsService = CheckinsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], CheckinsService);
//# sourceMappingURL=checkins.service.js.map