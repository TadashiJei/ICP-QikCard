// Mock ICP NFT Canister declarations
export const nftCanister = {
  mintNFT: async (metadata: any) => ({ ok: { id: 'mock-nft-id' } }),
  getNFT: async (id: string) => ({ ok: { id, owner: 'mock-owner', metadata: {} } }),
  transferNFT: async (id: string, to: string) => ({ ok: true }),
  getNFTsByOwner: async (owner: string) => ({ ok: [] }),
  burnNFT: async (id: string) => ({ ok: true }),
};

export default nftCanister;
