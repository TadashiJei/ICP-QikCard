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
exports.IcpService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let IcpService = class IcpService {
    config;
    constructor(config) {
        this.config = config;
    }
    getConfig() {
        return {
            host: this.config.get('ICP_HOST') ?? 'http://127.0.0.1:4943',
            authCanisterId: this.config.get('AUTH_CANISTER_ID'),
            eventCanisterId: this.config.get('EVENT_CANISTER_ID'),
            analyticsCanisterId: this.config.get('ANALYTICS_CANISTER_ID'),
            nftCanisterId: this.config.get('NFT_CANISTER_ID'),
            walletCanisterId: this.config.get('WALLET_CANISTER_ID'),
        };
    }
};
exports.IcpService = IcpService;
exports.IcpService = IcpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], IcpService);
//# sourceMappingURL=icp.service.js.map