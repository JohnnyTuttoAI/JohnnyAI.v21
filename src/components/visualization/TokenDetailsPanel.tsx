import React from 'react';
import { TokenDetails } from './types';
import { Icons } from '../icons';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface TokenDetailsPanelProps {
  token: TokenDetails;
  onClose: () => void;
}

export default function TokenDetailsPanel({ token, onClose }: TokenDetailsPanelProps) {
  // Add default correlations if not provided
  const correlations = token.correlations || [
    { token: 'BTC', value: 0.85 },
    { token: 'ETH', value: 0.72 },
    { token: 'USDT', value: 0.45 }
  ];

  return (
    <div className="absolute top-4 left-4 bg-black/90 border border-swiss-red/20 p-6 rounded-lg w-80">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-swiss text-xl">{token.id}</h3>
          <p className="text-sm font-mono text-gray-400">#{Math.floor(token.value)}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <Icons.X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Market Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-mono text-gray-400 mb-1">Market Cap</div>
            <div className="font-mono text-sm">{formatCurrency(token.marketCap)}</div>
          </div>
          <div>
            <div className="text-xs font-mono text-gray-400 mb-1">24h Volume</div>
            <div className="font-mono text-sm">{formatCurrency(token.volume24h)}</div>
          </div>
          <div>
            <div className="text-xs font-mono text-gray-400 mb-1">Market Share</div>
            <div className="font-mono text-sm">{formatPercentage(token.dominance)}</div>
          </div>
          <div>
            <div className="text-xs font-mono text-gray-400 mb-1">24h Change</div>
            <div className={`font-mono text-sm ${
              token.change24h >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {formatPercentage(token.change24h)}
            </div>
          </div>
        </div>

        {/* Network Stats */}
        <div>
          <div className="text-xs font-mono text-gray-400 mb-2">Network Activity</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-mono">Connections</span>
              <span className="text-sm font-mono">{token.connections}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-mono">Holders</span>
              <span className="text-sm font-mono">{token.holders.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-mono">Turnover</span>
              <span className="text-sm font-mono">
                {((token.volume24h / token.marketCap) * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Correlation Heatmap */}
        <div>
          <div className="text-xs font-mono text-gray-400 mb-2">Top Correlations</div>
          <div className="space-y-1">
            {correlations.map(corr => (
              <div key={corr.token} className="flex items-center space-x-2">
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple"
                    style={{ width: `${corr.value * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-mono w-12">{corr.token}</span>
                <span className="text-xs font-mono w-16 text-right">
                  {(corr.value * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Market Impact */}
        <div>
          <div className="text-xs font-mono text-gray-400 mb-2">Market Impact</div>
          <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink"
              style={{ width: `${(token.dominance / 50) * 100}%` }}
            >
              <div className="w-full h-full opacity-50 animate-pulse"></div>
            </div>
          </div>
          <div className="mt-1 text-xs font-mono text-gray-400 text-right">
            {formatPercentage(token.dominance)} of total market
          </div>
        </div>
      </div>
    </div>
  );
}