export interface CoinInfo {
  id: string;
  symbol: string;
  name: string;
  categories: string[];
}

export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  rank?: number;
  ath: number;
  athChangePercentage: number;
  athDate: string;
}

export interface TrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    price_btc: number;
    score: number;
  };
}

export interface GlobalData {
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  market_cap_percentage: Record<string, number>;
  market_cap_change_percentage_24h_usd: number;
}

export interface MarketOverview {
  globalData: GlobalData;
  trending: TrendingCoin[];
  topCoins: MarketData[];
  segments: Record<string, MarketSegment>;
  timestamp: string;
}