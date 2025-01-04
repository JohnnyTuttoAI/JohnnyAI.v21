import React from 'react';
import { Icons } from '../../components/icons';
import CompanySearch from '../../components/audit/company/CompanySearch';
import TokenGate from '../../components/audit/company/TokenGate';
import GlowingCard from '../../components/ui/GlowingCard';
import BrainLogo from '../../components/ui/BrainLogo';

export default function CorpAudit() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-swiss mb-2">Corporate Intelligence</h1>
          <p className="text-gray-400 font-mono">AI-powered corporate analysis and risk assessment</p>
        </div>
        <BrainLogo size="lg" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Search and Analysis */}
        <GlowingCard>
          <h2 className="text-xl font-swiss mb-4">Company Analysis</h2>
          <TokenGate>
            <CompanySearch />
          </TokenGate>
        </GlowingCard>

        {/* Features */}
        <div className="space-y-6">
          <GlowingCard>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-black/50 rounded-lg">
                <Icons.Search className="w-6 h-6 text-cyber-blue" />
              </div>
              <div>
                <h3 className="font-swiss text-lg mb-2">Intelligence Features</h3>
                <ul className="space-y-2">
                  {[
                    'Financial health analysis',
                    'Risk assessment',
                    'Market positioning',
                    'Competitive analysis',
                    'Growth metrics'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm font-mono text-gray-400">
                      <span className="w-1 h-1 bg-swiss-red"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlowingCard>

          <GlowingCard>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-black/50 rounded-lg">
                <Icons.BarChart2 className="w-6 h-6 text-cyber-purple" />
              </div>
              <div>
                <h3 className="font-swiss text-lg mb-2">Analysis Metrics</h3>
                <ul className="space-y-2">
                  {[
                    'Financial ratios',
                    'Market trends',
                    'Industry comparison',
                    'Historical performance',
                    'Risk indicators'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm font-mono text-gray-400">
                      <span className="w-1 h-1 bg-swiss-red"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlowingCard>
        </div>
      </div>
    </div>
  );
}