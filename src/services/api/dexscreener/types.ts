export interface DexPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceNative: string;
  priceUsd: string;
  txns: {
    m5: { buys: number; sells: number; };
    h1: { buys: number; sells: number; };
    h24: { buys: number; sells: number; };
  };
  volume: {
    m5: number;
    h1: number;
    h24: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h24: number;
  };
  liquidity?: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv?: number;
  pairCreatedAt?: number;
}

export interface PairAnalysis {
  buyPressure: number;
  volumeToLiquidity: number;
  isHighActivity: boolean;
  hasStrongLiquidity: boolean;
  recentPriceAction: {
    shortTerm: number;
    mediumTerm: number;
    longTerm: number;
  };
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  healthScore: number;
}

export interface PairMetrics {
  liquidityScore: number;
  volumeScore: number;
  txCountScore: number;
  ageScore: number;
  totalScore: number;
}