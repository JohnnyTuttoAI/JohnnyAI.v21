import { Chain } from 'wagmi';
import { base } from 'wagmi/chains';
import { Connection } from '@solana/web3.js';

export const solana: Chain = {
  id: 1399811149,
  name: 'Solana',
  network: 'solana',
  nativeCurrency: {
    decimals: 9,
    name: 'SOL',
    symbol: 'SOL',
  },
  rpcUrls: {
    default: { http: ['https://api.mainnet-beta.solana.com'] },
    public: { http: ['https://api.mainnet-beta.solana.com'] },
  },
  blockExplorers: {
    default: { name: 'Solscan', url: 'https://solscan.io' },
  },
  testnet: false,
};

export const supportedChains = [
  base,
  solana,
] as const;