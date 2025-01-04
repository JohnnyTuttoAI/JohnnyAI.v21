import { MarketData } from './types';

export interface MarketSegment {
  name: string;
  totalMarketCap: number;
  avgChange24h: number;
  topGainers: MarketData[];
  topLosers: MarketData[];
}

export function analyzeMarketSegments(coins: MarketData[]): Record<string, MarketSegment> {
  const segments = {
    'Top 10': coins.slice(0, 10),
    'Top 11-50': coins.slice(10, 50),
    'Top 51-100': coins.slice(50, 100),
    'Top 101-500': coins.slice(100, 500)
  };

  return Object.entries(segments).reduce((acc, [name, segmentCoins]) => {
    const totalMarketCap = segmentCoins.reduce((sum, coin) => sum + coin.marketCap, 0);
    const avgChange24h = segmentCoins.reduce((sum, coin) => sum + coin.change24h, 0) / segmentCoins.length;
    
    const sorted = [...segmentCoins].sort((a, b) => b.change24h - a.change24h);
    
    acc[name] = {
      name,
      totalMarketCap,
      avgChange24h,
      topGainers: sorted.slice(0, 3),
      topLosers: sorted.slice(-3).reverse()
    };
    
    return acc;
  }, {} as Record<string, MarketSegment>);
}