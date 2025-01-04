import { config } from '../config/env';

const BASE_URL = 'https://api.coingecko.com/api/v3';

interface CoinGeckoResponse {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

export async function getCryptoPrice(coinId: string): Promise<{ current_price: number; price_change_percentage_24h: number; } | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/simple/price?ids=${coinId}&vs_currencies=usd&include_24h_vol=true&include_24h_change=true`,
      {
        headers: {
          'x-cg-demo-api-key': config.coingeckoApiKey
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: CoinGeckoResponse = await response.json();
    
    if (!data[coinId]) {
      return null;
    }

    return {
      current_price: data[coinId].usd,
      price_change_percentage_24h: data[coinId].usd_24h_change
    };
  } catch (error) {
    console.error('Error fetching crypto price:', error);
    return null;
  }
}