```tsx
import React from 'react';
import { Icons } from '../icons';

const signals = [
  {
    type: 'accumulation',
    token: 'ETH',
    confidence: 0.85,
    description: 'Strong institutional accumulation detected',
    indicators: ['Large OTC deals', 'Decreasing exchange reserves', 'Increasing hodler base']
  },
  {
    type: 'distribution',
    token: 'SOL',
    confidence: 0.75,
    description: 'Whale distribution pattern emerging',
    indicators: ['Increasing exchange inflows', 'Large wallet movements', 'Rising sell pressure']
  }
];

export default function FlowsAnalysis() {
  return (
    <div className="space-y-4">
      {signals.map((signal, index) => (
        <div 
          key={index}
          className="p-4 bg-black/30 border border-swiss-red/20 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                signal.type === 'accumulation' ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                {signal.type === 'accumulation' ? 
                  <Icons.TrendingUp className="w-4 h-4 text-green-500" /> :
                  <Icons.TrendingDown className="w-4 h-4 text-red-500" />
                }
              </div>
              <div>
                <div className="font-mono text-lg">{signal.token}</div>
                <div className="text-sm font-mono text-gray-400">{signal.type}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono">Confidence</div>
              <div className="text-lg font-mono text-cyber-blue">
                {(signal.confidence * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          <div className="text-sm font-mono">{signal.description}</div>

          <div className="space-y-1">
            {signal.indicators.map((indicator, i) => (
              <div key={i} className="flex items-center space-x-2 text-sm font-mono text-gray-400">
                <span className="w-1 h-1 bg-swiss-red rounded-full"></span>
                <span>{indicator}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```