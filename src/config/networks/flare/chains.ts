import { Chain } from 'wagmi';

export const flareChain: Chain = {
  id: 14,
  name: 'Flare',
  network: 'flare',
  nativeCurrency: {
    decimals: 18,
    name: 'Flare',
    symbol: 'FLR',
  },
  rpcUrls: {
    default: { 
      http: ['https://flare-api.flare.network/ext/C/rpc']
    },
    public: { 
      http: ['https://flare-api.flare.network/ext/C/rpc']
    }
  },
  blockExplorers: {
    default: { name: 'Flare Explorer', url: 'https://flare-explorer.flare.network' },
  },
  testnet: false,
};

export const songbirdChain: Chain = {
  id: 19,
  name: 'Songbird',
  network: 'songbird',
  nativeCurrency: {
    decimals: 18,
    name: 'Songbird',
    symbol: 'SGB',
  },
  rpcUrls: {
    default: { 
      http: ['https://songbird-api.flare.network/ext/C/rpc']
    },
    public: { 
      http: ['https://songbird-api.flare.network/ext/C/rpc']
    }
  },
  blockExplorers: {
    default: { name: 'Songbird Explorer', url: 'https://songbird-explorer.flare.network' },
  },
  testnet: false,
};