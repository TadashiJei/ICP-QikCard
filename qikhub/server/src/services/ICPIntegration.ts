import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
// Mock imports for ICP declarations
const eventIdlFactory = {};
const nftIdlFactory = {};
const walletIdlFactory = {};

export interface ICPConfig {
  host: string;
  eventCanisterId: string;
  nftCanisterId: string;
  walletCanisterId: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface EventData {
  id: string;
  name: string;
  description: string;
  startTime: bigint;
  endTime: bigint;
  maxParticipants: number;
  organizer: Principal;
  isActive: boolean;
}

class ICPIntegration {
  private agent: HttpAgent;
  private eventActor: any;
  private nftActor: any;
  private walletActor: any;
  private config: ICPConfig;

  constructor(config: ICPConfig) {
    this.config = config;
    this.agent = new HttpAgent({ host: config.host });
    
    // Create actors for each canister
    this.eventActor = Actor.createActor(eventIdlFactory, {
      agent: this.agent,
      canisterId: config.eventCanisterId,
    });

    this.nftActor = Actor.createActor(nftIdlFactory, {
      agent: this.agent,
      canisterId: config.nftCanisterId,
    });

    this.walletActor = Actor.createActor(walletIdlFactory, {
      agent: this.agent,
      canisterId: config.walletCanisterId,
    });
  }

  async createEvent(eventData: {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    maxParticipants: number;
  }): Promise<string> {
    try {
      const result = await this.eventActor.createEvent({
        name: eventData.name,
        description: eventData.description,
        startTime: BigInt(eventData.startTime.getTime()),
        endTime: BigInt(eventData.endTime.getTime()),
        maxParticipants: eventData.maxParticipants,
      });

      if ('Ok' in result) {
        return result.Ok;
      } else {
        throw new Error(result.Err);
      }
    } catch (error) {
      console.error('Error creating event on ICP:', error);
      throw error;
    }
  }

  async getEvent(eventId: string): Promise<EventData | null> {
    try {
      const result = await this.eventActor.getEvent(eventId);
      if ('Ok' in result) {
        return result.Ok;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting event from ICP:', error);
      return null;
    }
  }

  async registerParticipant(eventId: string, participantId: string): Promise<boolean> {
    try {
      const result = await this.eventActor.registerParticipant(eventId, participantId);
      return 'Ok' in result;
    } catch (error) {
      console.error('Error registering participant on ICP:', error);
      return false;
    }
  }

  async checkInParticipant(eventId: string, participantId: string, deviceId: string): Promise<boolean> {
    try {
      const result = await this.eventActor.checkInParticipant(eventId, participantId, deviceId);
      return 'Ok' in result;
    } catch (error) {
      console.error('Error checking in participant on ICP:', error);
      return false;
    }
  }

  async mintAttendanceNFT(
    participantId: string,
    eventId: string,
    metadata: NFTMetadata
  ): Promise<string> {
    try {
      const result = await this.nftActor.mintAttendanceNFT(
        participantId,
        eventId,
        JSON.stringify(metadata)
      );

      if ('Ok' in result) {
        return result.Ok;
      } else {
        throw new Error(result.Err);
      }
    } catch (error) {
      console.error('Error minting NFT on ICP:', error);
      throw error;
    }
  }

  async getUserNFTs(userId: string): Promise<Array<{
    tokenId: string;
    eventId: string;
    metadata: NFTMetadata;
    mintedAt: Date;
  }>> {
    try {
      const result = await this.nftActor.getUserNFTs(userId);
      if ('Ok' in result) {
        return result.Ok.map((nft: any) => ({
          tokenId: nft.tokenId,
          eventId: nft.eventId,
          metadata: JSON.parse(nft.metadata),
          mintedAt: new Date(Number(nft.mintedAt)),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting user NFTs from ICP:', error);
      return [];
    }
  }

  async createWallet(userId: string): Promise<string> {
    try {
      const result = await this.walletActor.createWallet(userId);
      if ('Ok' in result) {
        return result.Ok;
      } else {
        throw new Error(result.Err);
      }
    } catch (error) {
      console.error('Error creating wallet on ICP:', error);
      throw error;
    }
  }

  async getWalletBalance(walletId: string): Promise<bigint> {
    try {
      const result = await this.walletActor.getBalance(walletId);
      if ('Ok' in result) {
        return result.Ok;
      } else {
        throw new Error(result.Err);
      }
    } catch (error) {
      console.error('Error getting wallet balance from ICP:', error);
      return BigInt(0);
    }
  }

  async transferTokens(fromWalletId: string, toWalletId: string, amount: bigint): Promise<boolean> {
    try {
      const result = await this.walletActor.transfer(fromWalletId, toWalletId, amount);
      return 'Ok' in result;
    } catch (error) {
      console.error('Error transferring tokens on ICP:', error);
      return false;
    }
  }

  async getEventParticipants(eventId: string): Promise<Array<{
    id: string;
    name: string;
    checkedIn: boolean;
    checkInTime?: Date;
  }>> {
    try {
      const result = await this.eventActor.getEventParticipants(eventId);
      if ('Ok' in result) {
        return result.Ok.map((participant: any) => ({
          id: participant.id,
          name: participant.name,
          checkedIn: participant.checkedIn,
          checkInTime: participant.checkInTime ? new Date(Number(participant.checkInTime)) : undefined,
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting event participants from ICP:', error);
      return [];
    }
  }

  async getEventStats(eventId: string): Promise<{
    totalParticipants: number;
    checkedIn: number;
    attendanceRate: number;
  }> {
    try {
      const result = await this.eventActor.getEventStats(eventId);
      if ('Ok' in result) {
        return {
          totalParticipants: Number(result.Ok.totalParticipants),
          checkedIn: Number(result.Ok.checkedIn),
          attendanceRate: Number(result.Ok.attendanceRate),
        };
      }
      return { totalParticipants: 0, checkedIn: 0, attendanceRate: 0 };
    } catch (error) {
      console.error('Error getting event stats from ICP:', error);
      return { totalParticipants: 0, checkedIn: 0, attendanceRate: 0 };
    }
  }

  async verifyICPIdentity(principalId: string): Promise<boolean> {
    try {
      // This would integrate with Internet Identity
      // For now, we'll simulate verification
      return true;
    } catch (error) {
      console.error('Error verifying ICP identity:', error);
      return false;
    }
  }

  async getBlockchainEvents(limit: number = 100): Promise<Array<any>> {
    try {
      const result = await this.eventActor.getRecentEvents(BigInt(limit));
      if ('Ok' in result) {
        return result.Ok;
      }
      return [];
    } catch (error) {
      console.error('Error getting blockchain events:', error);
      return [];
    }
  }
}

export default ICPIntegration;
