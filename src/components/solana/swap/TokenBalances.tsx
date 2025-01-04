import React from 'react';
import { useHeliusBalance } from '../../../hooks/useHeliusBalance';

export default function TokenBalances() {
  const { balances } = useHeliusBalance();

  if (!balances) return null;

  return (
    <div className="bg-black/50 border border-swiss-red/10 rounded p-4 font-mono text-sm">
      <h3 className="text-gray-400 mb-2">Your Balances</h3>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>SOL</span>
          <span className="text-cyber-blue">{balances.sol.toFixed(4)}</span>
        </div>
        {balances.tokens.map((token, i) => (
          <div key={i} className="flex justify-between">
            <span>{token.mint.slice(0, 4)}...{token.mint.slice(-4)}</span>
            <span className="text-cyber-purple">{token.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}