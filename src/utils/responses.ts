import { formatCurrency, formatPercentage } from './formatters';
import { getMarketSignal, formatMarketCap } from './market';
import type { MarketData, GlobalData, TrendingCoin } from '../services/api/coingecko';

interface PriceData {
  price: number;
  change24h: number;
  marketCap?: number;
  volume24h?: number;
}

export function formatPriceResponse(coinId: string, data: PriceData): string {
  const price = formatCurrency(data.price);
  const change = formatPercentage(data.change24h);
  const signal = getMarketSignal(data.change24h);
  const mcap = data.marketCap ? `MCap: ${formatMarketCap(data.marketCap)}` : '';
  
  return `${coinId.toUpperCase()}: ${price} (${change}) ${signal.emoji}\n${mcap}\n${signal.message}`;
}

export function formatMarketOverview(globalData: GlobalData, trending: TrendingCoin[]): string {
  const totalMcap = formatMarketCap(globalData.total_market_cap.usd);
  const btcDom = globalData.market_cap_percentage.btc.toFixed(1);
  const topTrending = trending.slice(0, 3)
    .map(t => `${t.item.symbol.toUpperCase()}: #${t.item.market_cap_rank}`)
    .join(', ');

  return `Market Update 📊\nTotal MCap: ${totalMcap}\nBTC Dom: ${btcDom}%\nTrending: ${topTrending}`;
}