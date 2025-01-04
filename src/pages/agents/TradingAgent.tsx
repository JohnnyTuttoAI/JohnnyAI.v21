import React from 'react';
import { Icons } from '../../components/icons';
import TokenSwap from '../../components/solana/TokenSwap';
import PumpScanner from '../../components/solana/pump/PumpScanner';

export default function TradingAgent() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-swiss mb-2">Johnny's Trading</h1>
          <p className="text-gray-400 font-mono">Automated trading and token operations</p>
        </div>
        <Icons.TrendingUp className="w-8 h-8 text-swiss-red" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TokenSwap />
        <PumpScanner />
      </div>
    </div>
  );
}