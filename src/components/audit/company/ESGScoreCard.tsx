```typescript
import React from 'react';
import type { ESGScore } from '../../../services/api/finnhub/types';

interface ESGScoreCardProps {
  score: ESGScore;
}

export default function ESGScoreCard({ score }: ESGScoreCardProps) {
  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-500';
    if (value >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const metrics = [
    { label: 'Environmental', value: score.environmentScore },
    { label: 'Social', value: score.socialScore },
    { label: 'Governance', value: score.governanceScore }
  ];

  return (
    <div className="bg-black/50 border border-swiss-red/10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-swiss text-lg">ESG Score</h3>
        <div className={`text-2xl font-mono ${getScoreColor(score.totalScore)}`}>
          {score.totalScore.toFixed(1)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
            <div className={`font-mono ${getScoreColor(metric.value)}`}>
              {metric.value.toFixed(1)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-right">
        Last updated: {new Date(score.lastRefreshed).toLocaleDateString()}
      </div>
    </div>
  );
}
```