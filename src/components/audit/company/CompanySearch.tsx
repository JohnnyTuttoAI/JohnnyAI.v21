import React, { useState } from 'react';
import { Icons } from '../../icons';
import CompanyAnalysis from './CompanyAnalysis';
import type { CompanySearchResult } from '../../../services/analysis/company/types';

export default function CompanySearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CompanySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanySearchResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // Mock search results
      const mockResults: CompanySearchResult[] = [
        {
          id: '1',
          name: 'Apple Inc.',
          ticker: 'AAPL',
          sector: 'Technology',
          marketCap: 3000000000000,
          employees: 154000,
          founded: 1976
        },
        {
          id: '2',
          name: 'Microsoft Corporation',
          ticker: 'MSFT',
          sector: 'Technology',
          marketCap: 2800000000000,
          employees: 181000,
          founded: 1975
        }
      ];

      setResults(mockResults.filter(company => 
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.ticker.toLowerCase().includes(query.toLowerCase())
      ));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies..."
            className="w-full bg-black border border-swiss-red/20 p-3 pr-12 font-mono text-sm rounded-none focus:outline-none focus:border-swiss-red"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-swiss-red hover:text-cyber-blue transition-colors"
          >
            <Icons.Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Search Results */}
      {results.length > 0 && !selectedCompany && (
        <div className="space-y-2">
          {results.map((company) => (
            <button
              key={company.id}
              onClick={() => setSelectedCompany(company)}
              className="w-full text-left bg-black/50 border border-swiss-red/10 p-4 hover:border-swiss-red/30 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-mono text-lg">{company.name}</div>
                  <div className="text-sm text-gray-400">{company.ticker}</div>
                </div>
                <div className="text-sm font-mono text-cyber-blue">
                  {company.sector}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Company Analysis */}
      {selectedCompany && (
        <CompanyAnalysis 
          company={selectedCompany} 
          onBack={() => setSelectedCompany(null)} 
        />
      )}
    </div>
  );
}