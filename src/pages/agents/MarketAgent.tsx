import React, { useState } from 'react';
import { Icons } from '../../components/icons';
import NetworkGraph from '../../components/visualization/NetworkGraph';
import ChatContainer from '../../components/chat/ChatContainer';
import GlowingCard from '../../components/ui/GlowingCard';

export default function MarketAgent() {
  const [activeTab, setActiveTab] = useState<'structure' | 'flows' | 'analysis'>('structure');

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-swiss mb-2">Johnny's Market</h1>
          <p className="text-gray-400 font-mono">Institutional flow analysis and market structure</p>
        </div>
        <Icons.BarChart2 className="w-8 h-8 text-swiss-red" />
      </header>

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 border border-swiss-red/20 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-swiss text-cyber-blue">Enhanced Flow Analysis Coming Soon</h2>
            <p className="text-sm font-mono text-gray-400">Advanced institutional flow tracking and market structure analysis features will be unlocked in the next update.</p>
          </div>
          <Icons.Lock className="w-6 h-6 text-swiss-red" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-swiss-red/20">
        <button
          onClick={() => setActiveTab('structure')}
          className={`px-4 py-2 font-mono text-sm ${
            activeTab === 'structure' 
              ? 'text-swiss-red border-b-2 border-swiss-red' 
              : 'text-gray-400 hover:text-swiss-red/70'
          }`}
        >
          Market Structure
        </button>
        <button
          onClick={() => setActiveTab('flows')}
          className={`px-4 py-2 font-mono text-sm ${
            activeTab === 'flows' 
              ? 'text-swiss-red border-b-2 border-swiss-red' 
              : 'text-gray-400 hover:text-swiss-red/70'
          }`}
        >
          Smart Money Flows
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2 font-mono text-sm ${
            activeTab === 'analysis' 
              ? 'text-swiss-red border-b-2 border-swiss-red' 
              : 'text-gray-400 hover:text-swiss-red/70'
          }`}
        >
          Market Analysis
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Network Visualization */}
        <GlowingCard>
          <h2 className="text-xl font-swiss mb-4">Network Visualization</h2>
          <NetworkGraph />
        </GlowingCard>

        {/* Right Column - Chat Interface */}
        <div className="space-y-8">
          <GlowingCard>
            <h2 className="text-xl font-swiss mb-4">Market Intelligence</h2>
            <ChatContainer />
          </GlowingCard>
        </div>
      </div>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          {
            title: "Market Structure",
            icon: <Icons.Brain className="w-6 h-6 text-cyber-blue" />,
            features: [
              "Real-time network visualization",
              "Token correlations",
              "Market segments analysis",
              "Liquidity flows tracking",
              "Volume profile analysis"
            ]
          },
          {
            title: "Smart Money Flows",
            icon: <Icons.TrendingUp className="w-6 h-6 text-cyber-purple" />,
            features: [
              "Institutional tracking",
              "Whale wallet monitoring",
              "Volume analysis",
              "Order flow analysis",
              "Smart money positioning"
            ]
          },
          {
            title: "Market Analysis",
            icon: <Icons.LineChart className="w-6 h-6 text-cyber-pink" />,
            features: [
              "Sentiment analysis",
              "Technical indicators",
              "Risk assessment",
              "Market psychology",
              "Trend detection"
            ]
          }
        ].map((capability, index) => (
          <GlowingCard key={index}>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-black/50 rounded-lg">
                {capability.icon}
              </div>
              <div>
                <h3 className="font-swiss text-lg mb-2">{capability.title}</h3>
                <ul className="space-y-2">
                  {capability.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm font-mono text-gray-400">
                      <span className="w-1 h-1 bg-swiss-red"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlowingCard>
        ))}
      </div>
    </div>
  );
}