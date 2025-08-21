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
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let DevicesService = class DevicesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    parseConfiguration(json) {
        if (json === undefined)
            return undefined;
        if (json === null)
            return client_1.Prisma.JsonNull;
        try {
            return JSON.parse(json);
        }
        catch (e) {
            throw new common_1.BadRequestException('configuration must be a valid JSON string');
        }
    }
    create(dto) {
        return this.prisma.qikPointDevice.create({
            data: {
                name: dto.name,
                deviceType: dto.deviceType,
                deviceId: dto.deviceId,
                status: dto.status ?? undefined,
                locationName: dto.locationName,
                locationLat: dto.locationLat ?? undefined,
                locationLng: dto.locationLng ?? undefined,
                firmwareVersion: dto.firmwareVersion,
                batteryLevel: dto.batteryLevel ?? undefined,
                signalStrength: dto.signalStrength ?? undefined,
                isOnline: dto.isOnline ?? undefined,
                ownerId: dto.ownerId,
                eventId: dto.eventId ?? undefined,
                configuration: this.parseConfiguration(dto.configuration),
            },
        });
    }
    findAll(filters) {
        const where = {};
        if (filters?.ownerId)
            where.ownerId = filters.ownerId;
        if (filters?.eventId)
            where.eventId = filters.eventId;
        return this.prisma.qikPointDevice.findMany({ where, orderBy: { createdAt: 'desc' } });
    }
    findByOwner(ownerId) {
        return this.findAll({ ownerId });
    }
    findByEvent(eventId) {
        return this.findAll({ eventId });
    }
    async findOne(id) {
        const item = await this.prisma.qikPointDevice.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Device not found');
        return item;
    }
    async update(id, dto) {
        try {
            return await this.prisma.qikPointDevice.update({
                where: { id },
                data: {
                    name: dto.name,
                    deviceType: dto.deviceType ?? undefined,
                    deviceId: dto.deviceId,
                    status: dto.status ?? undefined,
                    locationName: dto.locationName,
                    locationLat: dto.locationLat,
                    locationLng: dto.locationLng,
                    firmwareVersion: dto.firmwareVersion,
                    batteryLevel: dto.batteryLevel,
                    signalStrength: dto.signalStrength,
                    isOnline: dto.isOnline,
                    ownerId: dto.ownerId,
                    eventId: dto.eventId,
                    configuration: this.parseConfiguration(dto.configuration),
                },
            });
        }
        catch (e) {
            throw new common_1.NotFoundException('Device not found');
        }
    }
    async remove(id) {
        try {
            await this.prisma.qikPointDevice.delete({ where: { id } });
            return { success: true };
        }
        catch (e) {
            throw new common_1.NotFoundException('Device not found');
        }
    }
    async assignEvent(id, eventId) {
        try {
            return await this.prisma.qikPointDevice.update({ where: { id }, data: { eventId } });
        }
        catch (e) {
            throw new common_1.NotFoundException('Device not found');
        }
    }
    async unassignEvent(id) {
        try {
            return await this.prisma.qikPointDevice.update({ where: { id }, data: { eventId: null } });
        }
        catch (e) {
            throw new common_1.NotFoundException('Device not found');
        }
    }
};
exports.DevicesService = DevicesService;
exports.DevicesService = DevicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DevicesService);
//# sourceMappingURL=devices.service.js.map