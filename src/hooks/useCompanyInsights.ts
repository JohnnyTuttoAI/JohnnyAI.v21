```typescript
import { useState, useEffect } from 'react';
import { polygonClient } from '../services/api/polygon/client';
import { finnhubClient } from '../services/api/finnhub/client';
import type { CompanyInsights } from '../types';

export function useCompanyInsights(symbol: string) {
  const [insights, setInsights] = useState<CompanyInsights | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchInsights() {
      if (!symbol) return;
      
      setIsLoading(true);
      setError(null);

      try {
        // Fetch data from multiple sources in parallel
        const [
          marketData,
          financials,
          profile,
          sentiment,
          esgScore
        ] = await Promise.all([
          polygonClient.getMarketData(symbol),
          polygonClient.getFinancials(symbol),
          finnhubClient.getCompanyProfile(symbol),
          finnhubClient.getInsiderSentiment(symbol),
          finnhubClient.getESGScore(symbol)
        ]);

        setInsights({
          market: marketData,
          financials,
          profile,
          sentiment: sentiment[0], // Latest sentiment
          esg: esgScore,
          lastUpdated: new Date().toISOString()
        });
      } catch (err) {
        console.error('Error fetching insights:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch insights'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchInsights();
  }, [symbol]);

  return { insights, isLoading, error };
}
```