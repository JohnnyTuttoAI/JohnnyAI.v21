```tsx
import React from 'react';
import { institutionalMetrics } from './data';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

export default function InstitutionalMetrics() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Net Flow */}
      <div>
        <div className="text-xs font-mono text-gray-400 mb-1">Net Flow (24h)</div>
        <div className={`text-xl md:text-2xl font-mono ${
          institutionalMetrics.netFlow >= 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          {formatCurrency(institutionalMetrics.netFlow)}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div>
          <div className="text-xs font-mono text-gray-400 mb-1">Active Wallets</div>
          <div className="text-base md:text-lg font-mono">
            {institutionalMetrics.activeWallets.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-xs font-mono text-gray-400 mb-1">Dominance</div>
          <div className="text-base md:text-lg font-mono">
            {formatPercentage(institutionalMetrics.dominance)}
          </div>
        </div>
      </div>

      {/* Top Holdings */}
      <div>
        <div className="text-xs font-mono text-gray-400 mb-2">Top Holdings</div>
        <div className="space-y-2">
          {institutionalMetrics.topHoldings.map((holding, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-2 md:p-3 bg-black/30 border border-swiss-red/20"
            >
              <div>
                <div className="font-mono text-xs md:text-sm">{holding.token}</div>
                <div className="text-xs font-mono text-gray-400">
                  {holding.amount.toLocaleString()} tokens
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-xs md:text-sm">
                  {formatCurrency(holding.value)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```