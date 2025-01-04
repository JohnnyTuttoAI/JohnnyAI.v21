import { config } from '../../../config/env';
import { CoinInfo, MarketData, GlobalData, TrendingCoin, MarketOverview } from './types';
import { getGlobalData } from './market';
import { getTrendingCoins } from './trending';
import { getTopCoins } from './topCoins';
import { analyzeMarketSegments } from './marketSegments';
import { handleResponse } from '../base';

class CoinGeckoService {
  private readonly baseUrl: string;
  private readonly headers: HeadersInit;
  private marketOverview: MarketOverview | null = null;
  private lastUpdate: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.baseUrl = config.coingecko.baseUrl;
    this.headers = {
      'x-cg-pro-api-key': config.coingecko.apiKey,
      'Content-Type': 'application/json'
    };
  }

  async getCryptoPrice(coinId: string): Promise<MarketData | null> {
    try {
      // Try to get from cached market overview first
      if (this.marketOverview) {
        const cachedCoin = this.marketOverview.topCoins.find(
          c => c.id === this.normalizeCoinId(coinId)
        );
        if (cachedCoin) return cachedCoin;
      }

      const normalizedId = this.normalizeCoinId(coinId);
      const url = new URL(`${this.baseUrl}/simple/price`);
      url.searchParams.set('ids', normalizedId);
      url.searchParams.set('vs_currencies', 'usd');
      url.searchParams.set('include_24hr_change', 'true');
      url.searchParams.set('include_market_cap', 'true');
      url.searchParams.set('include_24hr_vol', 'true');

      const response = await fetch(url.toString(), { headers: this.headers });
      const data = await handleResponse<Record<string, any>>(response);

      if (!data[normalizedId]) return null;

      return {
        id: normalizedId,
        symbol: normalizedId.toUpperCase(),
        name: normalizedId,
        price: data[normalizedId].usd,
        change24h: data[normalizedId].usd_24h_change,
        marketCap: data[normalizedId].usd_market_cap,
        volume24h: data[normalizedId].usd_24h_vol,
        ath: 0,
        athChangePercentage: 0,
        athDate: new Date().toISOString()
      };
    } catch (error) {
      console.error('CoinGecko API Error:', error);
      return null;
    }
  }

  async getMarketOverview(): Promise<MarketOverview> {
    const now = Date.now();
    if (this.marketOverview && now - this.lastUpdate < this.CACHE_DURATION) {
      return this.marketOverview;
    }

    const [globalData, trending, topCoins] = await Promise.all([
      getGlobalData(),
      getTrendingCoins(),
      getTopCoins(500)
    ]);

    const segments = analyzeMarketSegments(topCoins);

    this.marketOverview = {
      globalData,
      trending,
      topCoins,
      segments,
      timestamp: new Date().toISOString()
    };

    this.lastUpdate = now;
    return this.marketOverview;
  }

  private readonly COIN_ALIASES: Record<string, string> = {
    'btc': 'bitcoin',
    'eth': 'ethereum',
    'sol': 'solana',
    'ada': 'cardano',
    'avax': 'avalanche-2',
    'matic': 'polygon',
    'link': 'chainlink',
    'uni': 'uniswap',
    'aave': 'aave',
    'doge': 'dogecoin',
    'shib': 'shiba-inu'
  };

  normalizeCoinId(input: string): string {
    const lowercaseInput = input.toLowerCase();
    return this.COIN_ALIASES[lowercaseInput] || lowercaseInput;
  }
}