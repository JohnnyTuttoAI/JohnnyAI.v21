export interface CompanySearchResult {
  id: string;
  name: string;
  ticker: string;
  sector: string;
  marketCap: number;
  employees: number;
  founded: number;
}

export interface CompanyAnalysis {
  financialHealth: {
    score: number;
    metrics: {
      profitMargin: number;
      debtToEquity: number;
      currentRatio: number;
      returnOnEquity: number;
    };
  };
  marketPosition: {
    score: number;
    metrics: {
      marketShare: number;
      competitiveAdvantage: number;
      brandStrength: number;
    };
  };
  riskAssessment: {
    level: 'LOW' | 'MEDIUM' | 'HIGH';
    factors: string[];
  };
  growthMetrics: {
    revenueGrowth: number;
    profitGrowth: number;
    employeeGrowth: number;
  };
}