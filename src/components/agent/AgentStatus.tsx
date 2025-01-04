import React from 'react';
import { useSolanaAgent } from '../../hooks/useSolanaAgent';

export default function AgentStatus() {
  const { state, loading, error } = useSolanaAgent();

  if (loading) return (
    <div className="animate-pulse bg-gray-800 rounded-lg p-4">
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-500">
      {error}
    </div>
  );

  if (!state) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Agent Level</span>
        <span className="font-mono text-cyber-blue">{state.level}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Experience</span>
        <span className="font-mono text-cyber-purple">{state.experience}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Last Active</span>
        <span className="font-mono text-cyber-pink">
          {new Date(state.lastInteraction).toLocaleString()}
        </span>
      </div>
    </div>
  );
}