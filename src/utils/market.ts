import { MARKET_SIGNALS } from '../config/constants';

export function getMarketSignal(change24h: number, volume24h: number, marketCap: number) {
  // Volume to Market Cap ratio (high volume = stronger signal)
  const volumeRatio = volume24h / marketCap;
  const signalStrength = Math.min(Math.abs(change24h) * (1 + volumeRatio), 100);

  // Enhanced signal detection with volume consideration
  if (signalStrength >= 15) return MARKET_SIGNALS.STRONG_BUY;
  if (signalStrength >= 8) return MARKET_SIGNALS.BUY;
  if (signalStrength <= -15) return MARKET_SIGNALS.STRONG_SELL;
  if (signalStrength <= -8) return MARKET_SIGNALS.SELL;
  return MARKET_SIGNALS.NEUTRAL;
}

export function formatMarketCap(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toFixed(2)}`;
}

export function getMarketHealth(data: {
  change24h: number;
  volume24h: number;
  marketCap: number;
  holders?: number;
}): string {
  const volumeRatio = data.volume24h / data.marketCap;
  const holderScore = data.holders ? Math.min(data.holders / 1000, 1) : 0.5;
  
  const health = (
    Math.abs(data.change24h) * 0.3 +
    volumeRatio * 0.4 +
    holderScore * 0.3
  );

  if (health >= 0.8) return 'STRONG';
  if (health >= 0.6) return 'HEALTHY';
  if (health >= 0.4) return 'NEUTRAL';
  if (health >= 0.2) return 'WEAK';
  return 'CRITICAL';
}