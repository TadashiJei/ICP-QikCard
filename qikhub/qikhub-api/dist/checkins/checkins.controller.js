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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckinsController = void 0;
const common_1 = require("@nestjs/common");
const checkins_service_1 = require("./checkins.service");
const create_checkin_dto_1 = require("./dto/create-checkin.dto");
const checkout_dto_1 = require("./dto/checkout.dto");
let CheckinsController = class CheckinsController {
    checkinsService;
    constructor(checkinsService) {
        this.checkinsService = checkinsService;
    }
    checkIn(dto) {
        return this.checkinsService.checkIn(dto);
    }
    checkOut(dto) {
        return this.checkinsService.checkOut(dto);
    }
    listByEvent(eventId) {
        return this.checkinsService.listByEvent(eventId);
    }
    listByParticipant(participantId) {
        return this.checkinsService.listByParticipant(participantId);
    }
};
exports.CheckinsController = CheckinsController;
__decorate([
    (0, common_1.Post)('check-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_checkin_dto_1.CreateCheckInDto]),
    __metadata("design:returntype", void 0)
], CheckinsController.prototype, "checkIn", null);
__decorate([
    (0, common_1.Post)('check-out'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [checkout_dto_1.CheckOutDto]),
    __metadata("design:returntype", void 0)
], CheckinsController.prototype, "checkOut", null);
__decorate([
    (0, common_1.Get)('event/:eventId'),
    __param(0, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CheckinsController.prototype, "listByEvent", null);
__decorate([
    (0, common_1.Get)('participant/:participantId'),
    __param(0, (0, common_1.Param)('participantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CheckinsController.prototype, "listByParticipant", null);
exports.CheckinsController = CheckinsController = __decorate([
    (0, common_1.Controller)('checkins'),
    __metadata("design:paramtypes", [checkins_service_1.CheckinsService])
], CheckinsController);
//# sourceMappingURL=checkins.controller.js.map