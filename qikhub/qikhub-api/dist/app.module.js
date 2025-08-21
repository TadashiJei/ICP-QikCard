"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const ws_gateway_1 = require("./ws/ws.gateway");
const events_module_1 = require("./events/events.module");
const icp_module_1 = require("./icp/icp.module");
const users_module_1 = require("./users/users.module");
const participants_module_1 = require("./participants/participants.module");
const devices_module_1 = require("./devices/devices.module");
const notifications_module_1 = require("./notifications/notifications.module");
const checkins_module_1 = require("./checkins/checkins.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            events_module_1.EventsModule,
            icp_module_1.IcpModule,
            users_module_1.UsersModule,
            participants_module_1.ParticipantsModule,
            devices_module_1.DevicesModule,
            notifications_module_1.NotificationsModule,
            checkins_module_1.CheckinsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, ws_gateway_1.WsGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map