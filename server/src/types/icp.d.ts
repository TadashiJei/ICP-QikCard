// Internet Computer Protocol (ICP) Type Declarations

declare module '@dfinity/agent' {
  export interface Identity {
    getPrincipal(): Principal;
  }
  
  export interface HttpAgentOptions {
    host?: string;
    identity?: Identity;
  }
  
  export class HttpAgent {
    constructor(options?: HttpAgentOptions);
    fetchRootKey(): Promise<void>;
  }
  
  export class Actor {
    static createActor(interfaceFactory: any, options: { agent: HttpAgent; canisterId: string }): any;
  }
}

declare module '@dfinity/principal' {
  export class Principal {
    static fromText(text: string): Principal;
    toText(): string;
  }
}

declare module '@dfinity/candid' {
  export const IDL: any;
}

// ICP Canister interfaces
export interface EventCanister {
  createEvent: (eventData: any) => Promise<any>;
  getEvent: (eventId: string) => Promise<any>;
  updateEvent: (eventId: string, updates: any) => Promise<any>;
  deleteEvent: (eventId: string) => Promise<any>;
  getEventsByOrganizer: (organizerId: string) => Promise<any[]>;
}

export interface NFTCanister {
  mintNFT: (metadata: any) => Promise<string>;
  transferNFT: (tokenId: string, to: string) => Promise<boolean>;
  getNFTMetadata: (tokenId: string) => Promise<any>;
  getUserNFTs: (userId: string) => Promise<string[]>;
}

export interface ProfileCanister {
  createProfile: (profileData: any) => Promise<string>;
  getProfile: (userId: string) => Promise<any>;
  updateProfile: (userId: string, updates: any) => Promise<boolean>;
  addAchievement: (userId: string, achievementId: string) => Promise<boolean>;
}

export interface AnalyticsCanister {
  recordCheckIn: (checkInData: any) => Promise<boolean>;
  getEventAnalytics: (eventId: string) => Promise<any>;
  getUserAnalytics: (userId: string) => Promise<any>;
}

export interface WalletCanister {
  getBalance: (userId: string) => Promise<bigint>;
  transfer: (from: string, to: string, amount: bigint) => Promise<boolean>;
  getTransactions: (userId: string, limit: number) => Promise<any[]>;
}
