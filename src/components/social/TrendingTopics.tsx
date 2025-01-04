import React from 'react';
import { useTrendingTopics } from '../../hooks/useTrendingTopics';

export default function TrendingTopics() {
  const { topics, isLoading } = useTrendingTopics();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        <div className="h-4 bg-gray-800 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {topics.map((topic, index) => (
        <div 
          key={index}
          className="flex items-center justify-between p-3 bg-black/30 border border-swiss-red/20"
        >
          <div className="flex items-center space-x-3">
            <span className="font-mono text-lg">#{index + 1}</span>
            <div>
              <div className="font-mono">{topic.name}</div>
              <div className="text-sm font-mono text-gray-400">{topic.mentions} mentions</div>
            </div>
          </div>
          <div className={`text-sm font-mono ${
            topic.sentiment > 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {topic.sentiment > 0 ? '+' : ''}{topic.sentiment}%
          </div>
        </div>
      ))}
    </div>
  );
}