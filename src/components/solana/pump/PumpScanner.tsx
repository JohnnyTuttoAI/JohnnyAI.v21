import React, { useState } from 'react';
import { Icons } from '../../icons';
import { pumpFunClient } from '../../../services/api/pumpfun/client';
import type { PumpScanResult } from '../../../services/api/pumpfun/types';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';

export default function PumpScanner() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PumpScanResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const data = await pumpFunClient.searchTokens(query);
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black/30 border border-swiss-red/20 rounded-lg p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-swiss mb-6">Pump Scanner</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tokens..."
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

      {/* Results */}
      <div className="space-y-4">
        {results.map((token) => (
          <div
            key={token.address}
            className="bg-black/50 border border-swiss-red/10 p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-mono text-lg">{token.symbol}</span>
                <span className="ml-2 text-sm text-gray-400">{token.name}</span>
              </div>
              <div className={`text-sm font-mono ${
                token.risk === 'LOW' ? 'text-green-500' :
                token.risk === 'MEDIUM' ? 'text-yellow-500' :
                'text-red-500'
              }`}>
                {token.risk}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Price</div>
                <div className="font-mono">{formatCurrency(token.price)}</div>
              </div>
              <div>
                <div className="text-gray-400">24h Change</div>
                <div className={`font-mono ${
                  token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {formatPercentage(token.priceChange24h)}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Volume 24h</div>
                <div className="font-mono">{formatCurrency(token.volume24h)}</div>
              </div>
              <div>
                <div className="text-gray-400">Market Cap</div>
                <div className="font-mono">{formatCurrency(token.marketCap)}</div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="text-gray-400">
                Score: <span className="text-cyber-blue">{token.score.toFixed(2)}</span>
              </div>
              <div className="text-gray-400">
                Holders: <span className="text-cyber-purple">{token.holders.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}