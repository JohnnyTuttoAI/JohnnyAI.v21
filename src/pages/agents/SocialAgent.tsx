import React, { useState } from 'react';
import { Icons } from '../../components/icons';
import TwitterTimeline from '../../components/social/TwitterTimeline';
import SentimentAnalysis from '../../components/social/SentimentAnalysis';
import TrendingTopics from '../../components/social/TrendingTopics';
import CommunityMetrics from '../../components/social/CommunityMetrics';
import ChatContainer from '../../components/chat/ChatContainer';
import GlowingCard from '../../components/ui/GlowingCard';

export default function SocialAgent() {
  const [activeTab, setActiveTab] = useState<'sentiment' | 'community' | 'trends'>('sentiment');

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-swiss mb-2">Johnny's Social</h1>
          <p className="text-gray-400 font-mono">Social sentiment and community insights</p>
        </div>
        <Icons.Users className="w-8 h-8 text-swiss-red" />
      </header>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-swiss-red/20">
        <button
          onClick={() => setActiveTab('sentiment')}
          className={`px-4 py-2 font-mono text-sm ${
            activeTab === 'sentiment' 
              ? 'text-swiss-red border-b-2 border-swiss-red' 
              : 'text-gray-400 hover:text-swiss-red/70'
          }`}
        >
          Sentiment Analysis
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`px-4 py-2 font-mono text-sm ${
            activeTab === 'community' 
              ? 'text-swiss-red border-b-2 border-swiss-red' 
              : 'text-gray-400 hover:text-swiss-red/70'
          }`}
        >
          Community Metrics
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-4 py-2 font-mono text-sm ${
            activeTab === 'trends' 
              ? 'text-swiss-red border-b-2 border-swiss-red' 
              : 'text-gray-400 hover:text-swiss-red/70'
          }`}
        >
          Trending Topics
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <GlowingCard>
            <h2 className="text-xl font-swiss mb-4">Social Sentiment</h2>
            <SentimentAnalysis />
          </GlowingCard>

          <GlowingCard>
            <h2 className="text-xl font-swiss mb-4">Trending Topics</h2>
            <TrendingTopics />
          </GlowingCard>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <GlowingCard>
            <h2 className="text-xl font-swiss mb-4">Community Metrics</h2>
            <CommunityMetrics />
          </GlowingCard>

          <GlowingCard>
            <h2 className="text-xl font-swiss mb-4">Social Feed</h2>
            <TwitterTimeline />
          </GlowingCard>

          <GlowingCard>
            <h2 className="text-xl font-swiss mb-4">AI Assistant</h2>
            <ChatContainer />
          </GlowingCard>
        </div>
      </div>
    </div>
  );
}