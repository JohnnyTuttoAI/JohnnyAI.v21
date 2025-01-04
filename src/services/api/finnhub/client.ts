```typescript
import { FINNHUB_CONFIG } from './config';
import type { 
  CompanyProfile, 
  FinancialReport, 
  InsiderSentiment,
  ESGScore 
} from './types';

class FinnhubClient {
  private baseUrl: string;
  private lastRequestTime: number = 0;

  constructor() {
    this.baseUrl = FINNHUB_CONFIG.baseUrl;
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < FINNHUB_CONFIG.rateLimit) {
      await new Promise(resolve => 
        setTimeout(resolve, FINNHUB_CONFIG.rateLimit - timeSinceLastRequest)
      );
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'X-Finnhub-Token': FINNHUB_CONFIG.apiKey
        }
      });

      this.lastRequestTime = Date.now();
      return response.json();
    } catch (error) {
      console.error('Finnhub API error:', error);
      throw error;
    }
  }

  async getCompanyProfile(symbol: string): Promise<CompanyProfile> {
    return this.makeRequest(`/stock/profile2?symbol=${symbol}`);
  }

  async getFinancialReports(symbol: string): Promise<FinancialReport[]> {
    return this.makeRequest(`/stock/financials-reported?symbol=${symbol}`);
  }

  async getInsiderSentiment(symbol: string): Promise<InsiderSentiment[]> {
    return this.makeRequest(`/stock/insider-sentiment?symbol=${symbol}`);
  }

  async getESGScore(symbol: string): Promise<ESGScore> {
    return this.makeRequest(`/stock/esg?symbol=${symbol}`);
  }
}

export const finnhubClient = new FinnhubClient();
```