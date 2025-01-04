import { DexPair, PairMetrics } from './types';
import { PAIR_THRESHOLDS } from './constants';

export function analyzePairMetrics(pair: DexPair): PairMetrics {
  const liquidityScore = calculateLiquidityScore(pair.liquidity?.usd || 0);
  const volumeScore = calculateVolumeScore(pair.volume.h24);
  const txCountScore = calculateTxScore(pair.txns.h24.buys + pair.txns.h24.sells);
  const ageScore = calculateAgeScore(pair.pairCreatedAt || 0);

  const totalScore = (
    liquidityScore * 0.4 +
    volumeScore * 0.3 +
    txCountScore * 0.2 +
    ageScore * 0.1
  );

  return {
    liquidityScore,
    volumeScore,
    txCountScore,
    ageScore,
    totalScore
  };
}

function calculateLiquidityScore(usdValue: number): number {
  const { high, medium, low } = PAIR_THRESHOLDS.liquidity;
  if (usdValue >= high) return 1;
  if (usdValue >= medium) return 0.8;
  if (usdValue >= low) return 0.5;
  return 0.2;
}

function calculateVolumeScore(volume24h: number): number {
  const { high, medium, low } = PAIR_THRESHOLDS.volume24h;
  if (volume24h >= high) return 1;
  if (volume24h >= medium) return 0.8;
  if (volume24h >= low) return 0.5;
  return 0.2;
}

function calculateTxScore(txCount24h: number): number {
  const { high, medium, low } = PAIR_THRESHOLDS.txCount24h;
  if (txCount24h >= high) return 1;
  if (txCount24h >= medium) return 0.8;
  if (txCount24h >= low) return 0.5;
  return 0.2;
}

function calculateAgeScore(createdAt: number): number {
  const ageInDays = (Date.now() - createdAt) / (1000 * 60 * 60 * 24);
  if (ageInDays >= 180) return 1;    // 6+ months
  if (ageInDays >= 30) return 0.8;   // 1+ month
  if (ageInDays >= 7) return 0.5;    // 1+ week
  return 0.2;
}