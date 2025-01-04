import React from 'react';
import TokenBalances from './TokenBalances';
import TokenSwapForm from './TokenSwapForm';

export default function TokenSwapCard() {
  return (
    <div className="bg-black/30 border border-swiss-red/20 rounded-lg p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-swiss mb-6">Token Swap</h2>
      
      {/* Balances Section */}
      <div className="mb-6">
        <TokenBalances />
      </div>

      {/* Swap Form */}
      <TokenSwapForm />
    </div>
  );
}