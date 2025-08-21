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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationsService = class NotificationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
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
    create(dto) {
        return this.prisma.notification.create({
            data: {
                title: dto.title,
                message: dto.message,
                type: dto.type,
                userId: dto.userId,
                isRead: dto.isRead ?? undefined,
                metadata: this.parseJson(dto.metadata),
            },
        });
    }
    findAll() {
        return this.prisma.notification.findMany({ orderBy: { createdAt: 'desc' } });
    }
    findByUser(userId) {
        return this.prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    }
    async findOne(id) {
        const item = await this.prisma.notification.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Notification not found');
        return item;
    }
    async update(id, dto) {
        try {
            return await this.prisma.notification.update({
                where: { id },
                data: {
                    title: dto.title,
                    message: dto.message,
                    type: dto.type ?? undefined,
                    isRead: dto.isRead,
                    metadata: this.parseJson(dto.metadata),
                },
            });
        }
        catch (e) {
            throw new common_1.NotFoundException('Notification not found');
        }
    }
    async remove(id) {
        try {
            await this.prisma.notification.delete({ where: { id } });
            return { success: true };
        }
        catch (e) {
            throw new common_1.NotFoundException('Notification not found');
        }
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map