import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface IcpConfig {
  host: string;
  authCanisterId?: string;
  eventCanisterId?: string;
  analyticsCanisterId?: string;
  nftCanisterId?: string;
  walletCanisterId?: string;
}

@Injectable()
export class IcpService {
  constructor(private readonly config: ConfigService) {}

  getConfig(): IcpConfig {
    return {
      host: this.config.get<string>('ICP_HOST') ?? 'http://127.0.0.1:4943',
      authCanisterId: this.config.get<string>('AUTH_CANISTER_ID'),
      eventCanisterId: this.config.get<string>('EVENT_CANISTER_ID'),
      analyticsCanisterId: this.config.get<string>('ANALYTICS_CANISTER_ID'),
      nftCanisterId: this.config.get<string>('NFT_CANISTER_ID'),
      walletCanisterId: this.config.get<string>('WALLET_CANISTER_ID'),
    };
  }
}
