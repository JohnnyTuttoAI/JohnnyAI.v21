import { DexPair } from './types';

export function calculatePairHealth(pair: DexPair): number {
  const scores = {
    liquidity: getLiquidityScore(pair.liquidity?.usd || 0),
    volume: getVolumeScore(pair.volume.h24),
    txCount: getTransactionScore(pair.txns.h24.buys + pair.txns.h24.sells),
    age: getAgeScore(pair.pairCreatedAt || 0)
  };

  return (scores.liquidity * 0.4 + 
          scores.volume * 0.3 + 
          scores.txCount * 0.2 + 
          scores.age * 0.1);
}

function getLiquidityScore(usdValue: number): number {
  if (usdValue >= 1000000) return 1; // $1M+
  if (usdValue >= 250000) return 0.8; // $250K+
  if (usdValue >= 50000) return 0.5; // $50K+
  return 0.2;
}

function getVolumeScore(volume24h: number): number {
  if (volume24h >= 500000) return 1; // $500K+
  if (volume24h >= 100000) return 0.8; // $100K+
  if (volume24h >= 25000) return 0.5; // $25K+
  return 0.2;
}

function getTransactionScore(txCount24h: number): number {
  if (txCount24h >= 1000) return 1; // 1000+ transactions
  if (txCount24h >= 500) return 0.8; // 500+ transactions
  if (txCount24h >= 100) return 0.5; // 100+ transactions
  return 0.2;
}

function getAgeScore(createdAt: number): number {
  const ageInDays = (Date.now() - createdAt) / (1000 * 60 * 60 * 24);
  if (ageInDays >= 180) return 1; // 6+ months
  if (ageInDays >= 30) return 0.8; // 1+ month
  if (ageInDays >= 7) return 0.5; // 1+ week
  return 0.2;
}