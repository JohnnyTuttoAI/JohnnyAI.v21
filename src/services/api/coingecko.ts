import { config } from '../../config/env';
import { handleResponse } from './base';

interface CoinGeckoPrice {
  [coinId: string]: {
    usd: number;
    usd_24h_change: number;
    usd_market_cap: number;
    usd_24h_vol: number;
  };
}

class CoinGeckoService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly headers: HeadersInit;

  constructor() {
    this.baseUrl = config.coingecko.baseUrl;
    this.apiKey = config.coingecko.apiKey;
    this.headers = {
      'x-cg-pro-api-key': this.apiKey,
      'Content-Type': 'application/json'
    };
  }

  async getCryptoPrice(coinId: string): Promise<{ 
    price: number; 
    change24h: number;
    marketCap: number;
    volume24h: number;
  } | null> {
    try {
      const url = new URL(`${this.baseUrl}/simple/price`);
      url.searchParams.append('ids', coinId);
      url.searchParams.append('vs_currencies', 'usd');
      url.searchParams.append('include_24hr_change', 'true');
      url.searchParams.append('include_market_cap', 'true');
      url.searchParams.append('include_24hr_vol', 'true');

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('CoinGecko API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        return null;
      }

      const data: CoinGeckoPrice = await response.json();
      
      if (!data[coinId]) {
        return null;
      }

      return {
        price: data[coinId].usd,
        change24h: data[coinId].usd_24h_change,
        marketCap: data[coinId].usd_market_cap,
        volume24h: data[coinId].usd_24h_vol
      };
    } catch (error) {
      console.error('CoinGecko API Error:', error);
      return null;
    }
  }

  // Common coin aliases for better UX
  private static readonly COIN_ALIASES: Record<string, string> = {
    'btc': 'bitcoin',
    'eth': 'ethereum',
    'sol': 'solana',
    'doge': 'dogecoin',
    'xrp': 'ripple',
    'ada': 'cardano',
    'dot': 'polkadot',
    'link': 'chainlink',
    'matic': 'polygon',
    'avax': 'avalanche',
    'uni': 'uniswap',
    'aave': 'aave',
    'shib': 'shiba-inu'
  };

  normalizeCoinId(input: string): string {
    const lowercaseInput = input.toLowerCase();
    return CoinGeckoService.COIN_ALIASES[lowercaseInput] || lowercaseInput;
  }
}

export const coinGeckoService = new CoinGeckoService();