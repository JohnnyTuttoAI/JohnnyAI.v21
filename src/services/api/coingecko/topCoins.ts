import { config } from '../../../config/env';
import { handleResponse } from '../base';
import type { MarketData } from './types';

interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
}

export async function getTopCoins(limit: number = 500): Promise<MarketData[]> {
  const url = new URL(`${config.coingecko.baseUrl}/coins/markets`);
  url.searchParams.set('vs_currency', 'usd');
  url.searchParams.set('order', 'market_cap_desc');
  url.searchParams.set('per_page', limit.toString());
  url.searchParams.set('page', '1');
  url.searchParams.set('sparkline', 'false');
  url.searchParams.set('price_change_percentage', '24h');

  const response = await fetch(url.toString(), {
    headers: { 'x-cg-pro-api-key': config.coingecko.apiKey }
  });

  const data = await handleResponse<CoinMarketData[]>(response);
  
  return data.map(coin => ({
    id: coin.id,
    symbol: coin.symbol.toUpperCase(),
    name: coin.name,
    price: coin.current_price,
    marketCap: coin.market_cap,
    rank: coin.market_cap_rank,
    change24h: coin.price_change_percentage_24h,
    volume24h: coin.total_volume,
    ath: coin.ath,
    athChangePercentage: coin.ath_change_percentage,
    athDate: coin.ath_date
  }));
}