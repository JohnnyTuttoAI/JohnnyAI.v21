import React from 'react';
import { Icons } from '../../components/icons';
import ContractAudit from '../../components/audit/ContractAudit';
import GlowingCard from '../../components/ui/GlowingCard';
import BrainLogo from '../../components/ui/BrainLogo';
import LockLogo from '../../components/ui/LockLogo';

export default function ContractAgent() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-swiss mb-2">Johnny's Contract Audit</h1>
          <p className="text-gray-400 font-mono">AI-powered smart contract analysis and optimization</p>
        </div>
        <BrainLogo size="lg" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contract Analysis */}
        <GlowingCard>
          <h2 className="text-xl font-swiss mb-4">Contract Analysis</h2>
          <ContractAudit />
        </GlowingCard>

        {/* Features */}
        <div className="space-y-6">
          <GlowingCard>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-black/50 rounded-lg">
                <BrainLogo size="sm" />
              </div>
              <div>
                <h3 className="font-swiss text-lg mb-2">AI-Powered Analysis</h3>
                <ul className="space-y-2">
                  {[
                    'Vulnerability detection',
                    'Gas optimization',
                    'Best practices review',
                    'Security recommendations',
                    'Code quality analysis'
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
                <LockLogo size="sm" />
              </div>
              <div>
                <h3 className="font-swiss text-lg mb-2">Security Features</h3>
                <ul className="space-y-2">
                  {[
                    'Reentrancy detection',
                    'Access control analysis',
                    'Integer overflow checks',
                    'Logic vulnerability scan',
                    'Dependency review'
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