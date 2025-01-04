import { GraphData } from './types';

export const marketData: GraphData = {
  nodes: [
    { 
      id: "BTC", 
      group: "major", 
      value: 100,
      marketCap: 800000000000,
      volume24h: 25000000000,
      dominance: 48.2,
      change24h: 2.5,
      holders: 1200000
    },
    { 
      id: "ETH", 
      group: "major", 
      value: 80,
      marketCap: 350000000000,
      volume24h: 15000000000,
      dominance: 18.5,
      change24h: 3.2,
      holders: 800000
    },
    { 
      id: "SOL", 
      group: "major", 
      value: 60,
      marketCap: 45000000000,
      volume24h: 2500000000,
      dominance: 2.8,
      change24h: 5.4,
      holders: 450000
    },
    { 
      id: "USDT", 
      group: "stable", 
      value: 90,
      marketCap: 95000000000,
      volume24h: 50000000000,
      dominance: 5.8,
      change24h: 0.1,
      holders: 950000
    },
    { 
      id: "USDC", 
      group: "stable", 
      value: 85,
      marketCap: 85000000000,
      volume24h: 45000000000,
      dominance: 5.2,
      change24h: -0.1,
      holders: 850000
    },
    { 
      id: "BNB", 
      group: "exchange", 
      value: 70,
      marketCap: 65000000000,
      volume24h: 3500000000,
      dominance: 3.9,
      change24h: 1.8,
      holders: 650000
    }
  ],
  links: [
    { source: "BTC", target: "ETH", value: 8, correlation: 0.85, volumeShare: 25 },
    { source: "BTC", target: "USDT", value: 10, correlation: 0.2, volumeShare: 35 },
    { source: "ETH", target: "USDT", value: 9, correlation: 0.15, volumeShare: 30 },
    { source: "ETH", target: "USDC", value: 8, correlation: 0.18, volumeShare: 28 },
    { source: "SOL", target: "USDT", value: 7, correlation: 0.65, volumeShare: 20 },
    { source: "SOL", target: "USDC", value: 6, correlation: 0.62, volumeShare: 18 },
    { source: "BNB", target: "USDT", value: 8, correlation: 0.72, volumeShare: 22 }
  ]
};

export const marketMetrics = {
  totalMarketCap: 1650000000000,
  total24hVolume: 142000000000,
  btcDominance: 48.2,
  activeMarkets: 850,
  defiTVL: 85000000000
};