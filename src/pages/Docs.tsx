import React from 'react';
import { Icons } from '../components/icons';
import GlowingCard from '../components/ui/GlowingCard';

export default function Docs() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-swiss mb-4">Documentation</h1>
        <p className="text-gray-400 font-mono">Technical specifications and integration guides</p>
      </header>

      {/* Documentation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DocSection
          title="Smart Contract Audit"
          description="AI-powered smart contract analysis and security assessment."
          icon={<Icons.Brain className="w-6 h-6" />}
          items={[
            "Vulnerability detection",
            "Gas optimization",
            "Best practices review",
            "Code quality analysis",
            "Security recommendations"
          ]}
        />

        <DocSection
          title="Corporate Intelligence"
          description="Advanced company analysis and market insights."
          icon={<Icons.Building2 className="w-6 h-6" />}
          items={[
            "Financial metrics analysis",
            "Market position assessment",
            "Risk evaluation",
            "Growth metrics tracking",
            "ESG score analysis"
          ]}
        />

        <DocSection
          title="Flow Analysis"
          description="Track institutional movements and market structure."
          icon={<Icons.BarChart2 className="w-6 h-6" />}
          items={[
            "Network visualization",
            "Token correlations",
            "Market segments",
            "Liquidity flows",
            "Volume analysis"
          ]}
        />

        <DocSection
          title="Trading Integration"
          description="Advanced trading features and token operations."
          icon={<Icons.TrendingUp className="w-6 h-6" />}
          items={[
            "Token swaps",
            "Pump detection",
            "Risk assessment",
            "Price impact analysis",
            "Liquidity tracking"
          ]}
        />

        <DocSection
          title="Social Sentiment"
          description="Community insights and social metrics analysis."
          icon={<Icons.Users className="w-6 h-6" />}
          items={[
            "Sentiment analysis",
            "Community metrics",
            "Trending topics",
            "Social volume",
            "Growth tracking"
          ]}
        />

        <DocSection
          title="Wallet Integration"
          description="Multi-chain wallet support and transaction management."
          icon={<Icons.Wallet className="w-6 h-6" />}
          items={[
            "EVM chains support",
            "Solana integration",
            "Transaction signing",
            "Balance tracking",
            "Token management"
          ]}
        />
      </div>

      {/* Coming Soon Section */}
      <div className="mt-12">
        <GlowingCard>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-swiss mb-2">Enhanced Features Coming Soon</h2>
              <p className="text-sm font-mono text-gray-400">Advanced institutional flow tracking and market structure analysis features will be unlocked in upcoming updates.</p>
            </div>
            <Icons.Lock className="w-8 h-8 text-swiss-red" />
          </div>
        </GlowingCard>
      </div>
    </div>
  );
}

interface DocSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
}

function DocSection({ title, description, icon, items }: DocSectionProps) {
  return (
    <div className="group relative">
      {/* Swiss Border */}
      <div className="absolute inset-0 border border-swiss-red opacity-50 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Content */}
      <div className="relative p-6 bg-black">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="text-swiss-red group-hover:text-cyber-blue transition-colors">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-swiss mb-2">{title}</h3>
            <p className="text-sm text-gray-400 font-mono">{description}</p>
          </div>
        </div>

        {/* Items */}
        <ul className="space-y-2 mt-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm">
              <span className="w-1 h-1 bg-swiss-red"></span>
              <span className="font-mono text-gray-300">{item}</span>
            </li>
          ))}
        </ul>

        {/* Cyber Corner */}
        <div className="absolute top-0 right-0 w-2 h-2 bg-cyber-blue"></div>
      </div>
    </div>
  );
}