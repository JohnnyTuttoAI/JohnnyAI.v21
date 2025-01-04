```typescript
import { useState, useEffect } from 'react';
import { polygonClient } from '../services/api/polygon/client';
import type { 
  CompanyDetails, 
  FinancialMetrics, 
  MarketData,
  NewsItem 
} from '../services/api/polygon/types';

export function useCompanyData(ticker: string) {
  const [data, setData] = useState<{
    details?: CompanyDetails;
    financials?: FinancialMetrics;
    market?: MarketData;
    news?: NewsItem[];
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      
      try {
        const [details, financials, market, news] = await Promise.all([
          polygonClient.getCompanyDetails(ticker),
          polygonClient.getFinancials(ticker),
          polygonClient.getMarketData(ticker),
          polygonClient.getCompanyNews(ticker)
        ]);

        setData({ details, financials, market, news });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setIsLoading(false);
      }
    }

    if (ticker) {
      fetchData();
    }
  }, [ticker]);

  return { data, isLoading, error };
}
```