```typescript
export interface CompanyDetails {
  ticker: string;
  name: string;
  description: string;
  sic_description: string;
  total_employees: number;
  list_date: string;
  market_cap: number;
  primary_exchange: string;
}

export interface FinancialMetrics {
  gross_profit: number;
  net_income: number;
  ebitda: number;
  revenue: number;
  assets: number;
  debt: number;
  ratios: {
    pe_ratio: number;
    price_to_sales: number;
    debt_to_equity: number;
    current_ratio: number;
  };
}

export interface MarketData {
  ticker: string;
  day: {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    vwap: number;
  };
  lastQuote: {
    ask: number;
    bid: number;
    size: number;
    timestamp: number;
  };
  lastTrade: {
    price: number;
    size: number;
    timestamp: number;
  };
  prevDay: {
    close: number;
    volume: number;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  author: string;
  published_utc: string;
  article_url: string;
  tickers: string[];
  description: string;
  keywords: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
}
```