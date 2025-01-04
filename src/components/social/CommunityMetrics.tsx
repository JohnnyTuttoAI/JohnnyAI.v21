import React from 'react';
import { useCommunityMetrics } from '../../hooks/useCommunityMetrics';

export default function CommunityMetrics() {
  const { metrics, isLoading } = useCommunityMetrics();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        <div className="h-4 bg-gray-800 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Growth Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/30 border border-swiss-red/20">
          <div className="text-2xl font-mono mb-1">{metrics.totalMembers}</div>
          <div className="text-sm font-mono text-gray-400">Total Members</div>
        </div>
        <div className="p-4 bg-black/30 border border-swiss-red/20">
          <div className="text-2xl font-mono mb-1">{metrics.activeUsers}</div>
          <div className="text-sm font-mono text-gray-400">Active Users</div>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="space-y-3">
        <div className="text-sm font-mono text-gray-400">Engagement</div>
        <div className="space-y-2">
          {Object.entries(metrics.engagement).map(([key, value]) => (
            <div 
              key={key}
              className="flex items-center justify-between p-2 bg-black/30 border border-swiss-red/20"
            >
              <span className="font-mono text-sm">{key}</span>
              <span className="font-mono text-sm">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Chart */}
      <div className="h-40 bg-black/30 border border-swiss-red/20 p-4">
        <div className="text-sm font-mono text-gray-400 mb-4">Growth Trend</div>
        {/* Add D3 chart here */}
      </div>
    </div>
  );
}