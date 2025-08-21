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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let EventsService = class EventsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const event = await this.prisma.event.create({
            data: {
                name: dto.name,
                description: dto.description,
                startDate: dto.startDate,
                endDate: dto.endDate,
                maxAttendees: dto.maxAttendees,
                status: dto.status ?? undefined,
                venueName: dto.venueName,
                venueAddress: dto.venueAddress,
                venueLat: dto.venueLat ?? null,
                venueLng: dto.venueLng ?? null,
                wifiAvailable: dto.wifiAvailable ?? undefined,
                registrationOpen: dto.registrationOpen ?? undefined,
                requireApproval: dto.requireApproval ?? undefined,
                customFields: dto.customFields === undefined
                    ? undefined
                    : dto.customFields === null
                        ? client_1.Prisma.JsonNull
                        : dto.customFields,
                organizerId: dto.organizerId,
            },
        });
        return event;
    }
    async findAll() {
        return this.prisma.event.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const event = await this.prisma.event.findUnique({ where: { id } });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        return event;
    }
    async update(id, dto) {
        try {
            return await this.prisma.event.update({
                where: { id },
                data: {
                    name: dto.name,
                    description: dto.description,
                    startDate: dto.startDate,
                    endDate: dto.endDate,
                    maxAttendees: dto.maxAttendees,
                    status: dto.status ?? undefined,
                    venueName: dto.venueName,
                    venueAddress: dto.venueAddress,
                    venueLat: dto.venueLat ?? null,
                    venueLng: dto.venueLng ?? null,
                    wifiAvailable: dto.wifiAvailable,
                    registrationOpen: dto.registrationOpen,
                    requireApproval: dto.requireApproval,
                    customFields: dto.customFields === undefined
                        ? undefined
                        : dto.customFields === null
                            ? client_1.Prisma.JsonNull
                            : dto.customFields,
                    organizerId: dto.organizerId,
                },
            });
        }
        catch (e) {
            throw new common_1.NotFoundException('Event not found');
        }
    }
    async remove(id) {
        try {
            await this.prisma.event.delete({ where: { id } });
            return { success: true };
        }
        catch (e) {
            throw new common_1.NotFoundException('Event not found');
        }
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
//# sourceMappingURL=events.service.js.map