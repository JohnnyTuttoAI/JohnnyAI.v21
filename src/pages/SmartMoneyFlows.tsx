```tsx
import React from 'react';
import { Icons } from '../components/icons';
import FlowsVisualization from '../components/flows/FlowsVisualization';
import WhaleActivity from '../components/flows/WhaleActivity';
import InstitutionalMetrics from '../components/flows/InstitutionalMetrics';
import FlowsAnalysis from '../components/flows/FlowsAnalysis';
import GlowingCard from '../components/ui/GlowingCard';

export default function SmartMoneyFlows() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Responsive Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-swiss mb-2">Smart Money Flows</h1>
          <p className="text-sm md:text-base text-gray-400 font-mono">Track institutional movements and whale activity</p>
        </div>
        <Icons.TrendingUp className="w-8 h-8 text-swiss-red" />
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Visualization - Full width on mobile */}
        <div className="lg:col-span-2">
          <GlowingCard className="overflow-x-auto">
            <h2 className="text-lg md:text-xl font-swiss mb-4">Capital Flows</h2>
            <div className="min-w-[320px]">
              <FlowsVisualization />
            </div>
          </GlowingCard>
        </div>

        {/* Metrics Panel - Stack on mobile */}
        <div className="space-y-4 md:space-y-6">
          <GlowingCard>
            <h2 className="text-lg md:text-xl font-swiss mb-4">Institutional Metrics</h2>
            <InstitutionalMetrics />
          </GlowingCard>

          <GlowingCard>
            <h2 className="text-lg md:text-xl font-swiss mb-4">Whale Activity</h2>
            <WhaleActivity />
          </GlowingCard>
        </div>
      </div>

      {/* Analysis Section - Full width on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <GlowingCard className="lg:col-span-2">
          <h2 className="text-lg md:text-xl font-swiss mb-4">Flow Analysis</h2>
          <FlowsAnalysis />
        </GlowingCard>
      </div>
    </div>
  );
}
```