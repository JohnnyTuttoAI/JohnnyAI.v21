```typescript
import { POLYGON_CONFIG } from './config';
import { PolygonError, ERROR_CODES } from './errors';
import type { 
  CompanyDetails, 
  FinancialMetrics,
  MarketData,
  NewsItem 
} from './types';

class PolygonClient {
  private baseUrl: string;
  private lastRequestTime: number = 0;

  constructor() {
    this.baseUrl = POLYGON_CONFIG.baseUrl;
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < POLYGON_CONFIG.rateLimit) {
      await new Promise(resolve => 
        setTimeout(resolve, POLYGON_CONFIG.rateLimit - timeSinceLastRequest)
      );
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${POLYGON_CONFIG.apiKey}`
        }
      });

      this.lastRequestTime = Date.now();

      if (!response.ok) {
        throw new PolygonError(
          'API request failed',
          response.status,
          ERROR_CODES.API_ERROR
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof PolygonError) throw error;
      throw new PolygonError(
        'Network error',
        undefined,
        ERROR_CODES.NETWORK_ERROR
      );
    }
  }

  async getCompanyDetails(ticker: string): Promise<CompanyDetails> {
    return this.makeRequest(`/reference/tickers/${ticker}`);
  }

  async getFinancials(ticker: string): Promise<FinancialMetrics> {
    return this.makeRequest(`/reference/financials/${ticker}`);
  }

  async getMarketData(ticker: string): Promise<MarketData> {
    return this.makeRequest(`/snapshot/locale/us/markets/stocks/tickers/${ticker}`);
  }

  async getCompanyNews(ticker: string): Promise<NewsItem[]> {
    return this.makeRequest(`/reference/news?ticker=${ticker}&limit=10`);
  }
}

export const polygonClient = new PolygonClient();
```