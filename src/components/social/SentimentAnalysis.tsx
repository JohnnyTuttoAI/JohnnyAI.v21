import React from 'react';
import { useSocialSentiment } from '../../hooks/useSocialSentiment';

export default function SentimentAnalysis() {
  const { sentiment, isLoading } = useSocialSentiment();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        <div className="h-4 bg-gray-800 rounded w-1/2"></div>
      </div>
    );
  }

  const riskColors = {
    low: 'text-green-500',
    medium: 'text-yellow-500',
    high: 'text-red-500'
  };

  return (
    <div className="space-y-6">
      {/* Overall Sentiment */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-gray-400">Overall Sentiment</span>
        <div className="flex items-center space-x-2">
          <div className={`h-2 w-24 rounded-full overflow-hidden bg-gray-800`}>
            <div 
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
              style={{ width: `${sentiment.score * 100}%` }}
            ></div>
          </div>
          <span className="font-mono text-sm">{(sentiment.score * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Risk Level */}
      <div className="p-4 bg-black/30 border border-swiss-red/20">
        <div className={`text-2xl font-mono mb-1 ${riskColors[sentiment.riskLevel]}`}>
          {sentiment.riskLevel.toUpperCase()}
        </div>
        <div className="text-sm font-mono text-gray-400">Risk Level</div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/30 border border-swiss-red/20">
          <div className="text-2xl font-mono mb-1">{sentiment.fearGreedIndex}</div>
          <div className="text-sm font-mono text-gray-400">Fear & Greed</div>
        </div>
        <div className="p-4 bg-black/30 border border-swiss-red/20">
          <div className="text-2xl font-mono mb-1">{sentiment.socialVolume.toLocaleString()}</div>
          <div className="text-sm font-mono text-gray-400">Social Volume</div>
        </div>
      </div>

      {/* Signals */}
      <div className="space-y-2">
        <div className="text-sm font-mono text-gray-400 mb-2">Market Signals</div>
        {sentiment.signals.map((signal, index) => (
          <div 
            key={index}
            className="flex items-center space-x-2 text-sm font-mono p-2 bg-black/30 border border-swiss-red/20"
          >
            <span className="w-1 h-1 bg-swiss-red rounded-full"></span>
            <span>{signal}</span>
          </div>
        ))}
      </div>
    </div>
  );
}