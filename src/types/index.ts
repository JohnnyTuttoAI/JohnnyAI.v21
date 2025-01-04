```typescript
import type { 
  MarketData, 
  FinancialMetrics 
} from '../services/api/polygon/types';
import type { 
  CompanyProfile,
  InsiderSentiment,
  ESGScore 
} from '../services/api/finnhub/types';

export interface CompanyInsights {
  market: MarketData;
  financials: FinancialMetrics;
  profile: CompanyProfile;
  sentiment: InsiderSentiment;
  esg: ESGScore;
  lastUpdated: string;
}

// ... existing types ...
```