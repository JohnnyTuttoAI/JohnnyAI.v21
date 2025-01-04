```typescript
import React from 'react';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';
import type { FinancialMetrics, MarketData } from '../../../services/api/polygon/types';

interface CompanyMetricsProps {
  financials?: FinancialMetrics;
  market?: MarketData;
}

export default function CompanyMetrics({ financials, market }: CompanyMetricsProps) {
  if (!financials || !market) return null;

  const metrics = [
    {
      label: 'Revenue',
      value: formatCurrency(financials.revenue),
      type: 'currency'
    },
    {
      label: 'Net Income',
      value: formatCurrency(financials.net_income),
      type: 'currency'
    },
    {
      label: 'P/E Ratio',
      value: financials.ratios.pe_ratio.toFixed(2),
      type: 'number'
    },
    {
      label: 'Debt/Equity',
      value: formatPercentage(financials.ratios.debt_to_equity),
      type: 'percentage'
    }
  ];

  const marketMetrics = [
    {
      label: 'Current Price',
      value: formatCurrency(market.lastTrade.price),
      type: 'currency'
    },
    {
      label: 'Volume',
      value: market.day.volume.toLocaleString(),
      type: 'number'
    },
    {
      label: 'Day Range',
      value: `${formatCurrency(market.day.low)} - ${formatCurrency(market.day.high)}`,
      type: 'range'
    },
    {
      label: 'VWAP',
      value: formatCurrency(market.day.vwap),
      type: 'currency'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Financial Metrics */}
      <div className="bg-black/50 border border-swiss-red/10 p-4">
        <h3 className="font-swiss text-lg mb-4">Financial Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <div className="text-sm text-gray-400">{metric.label}</div>
              <div className="font-mono">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Data */}
      <div className="bg-black/50 border border-swiss-red/10 p-4">
        <h3 className="font-swiss text-lg mb-4">Market Data</h3>
        <div className="grid grid-cols-2 gap-4">
          {marketMetrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <div className="text-sm text-gray-400">{metric.label}</div>
              <div className="font-mono">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```