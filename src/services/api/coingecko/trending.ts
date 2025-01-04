import { config } from '../../../config/env';
import { handleResponse } from '../base';

interface TrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    price_btc: number;
    score: number;
  };
}

export async function getTrendingCoins(): Promise<TrendingCoin[]> {
  const url = `${config.coingecko.baseUrl}/search/trending`;
  const response = await fetch(url, {
    headers: { 'x-cg-pro-api-key': config.coingecko.apiKey }
  });
  const data = await handleResponse<{ coins: TrendingCoin[] }>(response);
  return data.coins;
}