import { ConfigService } from '@nestjs/config';
export interface IcpConfig {
    host: string;
    authCanisterId?: string;
    eventCanisterId?: string;
    analyticsCanisterId?: string;
    nftCanisterId?: string;
    walletCanisterId?: string;
}
export declare class IcpService {
    private readonly config;
    constructor(config: ConfigService);
    getConfig(): IcpConfig;
}
