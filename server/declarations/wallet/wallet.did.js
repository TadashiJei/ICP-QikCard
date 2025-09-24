// Mock ICP Wallet Canister declarations
export const walletCanister = {
  createWallet: async (userId: string) => ({ ok: { address: 'mock-wallet-address' } }),
  getBalance: async (address: string) => ({ ok: { icp: 0, btc: 0 } }),
  transfer: async (from: string, to: string, amount: number) => ({ ok: { txId: 'mock-tx-id' } }),
  getTransactions: async (address: string) => ({ ok: [] }),
  getAddress: async (userId: string) => ({ ok: 'mock-wallet-address' }),
};

export default walletCanister;
