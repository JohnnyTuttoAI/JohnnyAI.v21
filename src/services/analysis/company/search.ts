import { polygonClient } from '../../api/polygon/client';
import { finnhubClient } from '../../api/finnhub/client';
import type { CompanySearchResult } from './types';

const POPULAR_COMPANIES = [
  { id: 'AAPL', name: 'Apple Inc.', sector: 'Technology' },
  { id: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology' },
  { id: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology' },
  { id: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer Cyclical' },
  { id: 'META', name: 'Meta Platforms Inc.', sector: 'Technology' },
  { id: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive' },
  { id: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology' },
  { id: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financial Services' },
  { id: 'V', name: 'Visa Inc.', sector: 'Financial Services' },
  { id: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare' }
];

export async function searchCompany(query: string): Promise<CompanySearchResult[]> {
  try {
    // If no query, return popular companies
    if (!query.trim()) {
      return POPULAR_COMPANIES.map(company => ({
        id: company.id,
        name: company.name,
        ticker: company.id,
        sector: company.sector,
        marketCap: 0, // Will be populated with real data
        employees: 0,
        founded: 0
      }));
    }

    // Search both by ticker and company name
    const [tickerResults, nameResults] = await Promise.all([
      polygonClient.searchTicker(query),
      polygonClient.searchCompanyName(query)
    ]);

    // Combine and deduplicate results
    const results = [...tickerResults, ...nameResults];
    const uniqueResults = Array.from(new Map(results.map(item => 
      [item.ticker, item]
    )).values());

    // Enrich with additional data
    const enrichedResults = await Promise.all(
      uniqueResults.map(async (result) => {
        try {
          const profile = await finnhubClient.getCompanyProfile(result.ticker);
          return {
            id: result.ticker,
            name: result.name,
            ticker: result.ticker,
            sector: profile.finnhubIndustry,
            marketCap: profile.marketCapitalization,
            employees: profile.totalEmployees || 0,
            founded: new Date(profile.ipo).getFullYear()
          };
        } catch (error) {
          console.error(`Error enriching data for ${result.ticker}:`, error);
          return result;
        }
      })
    );

    return enrichedResults;
  } catch (error) {
    console.error('Company search error:', error);
    throw error;
  }
}