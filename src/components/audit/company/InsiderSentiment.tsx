```typescript
import React from 'react';
import { Icons } from '../../icons';
import type { InsiderSentiment } from '../../../services/api/finnhub/types';

interface InsiderSentimentProps {
  sentiment: InsiderSentiment;
}

export default function InsiderSentimentCard({ sentiment }: InsiderSentimentProps) {
  const getSentimentColor = (change: number) => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-400';
  };

  return (
    <div className="bg-black/50 border border-swiss-red/10 p-4">
      <h3 className="font-swiss text-lg mb-4">Insider Sentiment</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">Net Change</div>
          <div className={`font-mono ${getSentimentColor(sentiment.change)}`}>
            {sentiment.change > 0 ? '+' : ''}{sentiment.change.toFixed(2)}%
            {sentiment.change > 0 ? (
              <Icons.TrendingUp className="w-4 h-4 inline ml-2" />
            ) : (
              <Icons.TrendingDown className="w-4 h-4 inline ml-2" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">Purchase Ratio</div>
          <div className="font-mono text-cyber-blue">
            {(sentiment.mspr * 100).toFixed(1)}%
          </div>
        </div>

        <div className="text-xs text-gray-500">
          Period: {sentiment.year}/{String(sentiment.month).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
```