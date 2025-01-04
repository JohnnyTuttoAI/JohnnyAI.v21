```typescript
export interface CompanyProfile {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
}

export interface FinancialReport {
  accessNumber: string;
  symbol: string;
  cik: string;
  year: number;
  quarter: number;
  form: string;
  startDate: string;
  endDate: string;
  filedDate: string;
  report: {
    bs: any; // Balance Sheet
    cf: any; // Cash Flow
    ic: any; // Income Statement
  };
}

export interface InsiderSentiment {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number; // Monthly Share Purchase Ratio
}

export interface ESGScore {
  symbol: string;
  totalScore: number;
  environmentScore: number;
  socialScore: number;
  governanceScore: number;
  lastRefreshed: string;
}
```