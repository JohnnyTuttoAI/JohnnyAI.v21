// Update the existing TokenSwapForm component
import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useJupiterSwap } from '../../../hooks/useJupiterSwap';
import { pumpFunClient } from '../../../services/api/pumpfun/client';
import { Icons } from '../../icons';
import { TOKENS } from '../../../config/tokens';
import QuoteDisplay from './QuoteDisplay';
import type { QuoteResponse } from '../../../services/api/pumpfun/types';

export default function TokenSwapForm() {
  const { publicKey } = useWallet();
  const { executeSwap, isLoading } = useJupiterSwap();
  
  const [formData, setFormData] = useState({
    targetMint: '',
    amount: '',
    slippage: '1'
  });

  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [isQuoteLoading, setIsQuoteLoading] = useState(false);

  const handleGetQuote = async () => {
    if (!formData.targetMint || !formData.amount) return;

    setIsQuoteLoading(true);
    try {
      const quote = await pumpFunClient.getQuote({
        quote_type: 'buy',
        mint: formData.targetMint,
        amount: Number(formData.amount) * 1e9, // Convert SOL to lamports
        slippage: Number(formData.slippage)
      });
      setQuote(quote);
    } catch (error) {
      console.error('Quote error:', error);
    } finally {
      setIsQuoteLoading(false);
    }
  };

  // Update amount handler to fetch quote on change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, amount: e.target.value }));
    // Debounce quote fetch
    const timeoutId = setTimeout(() => {
      if (e.target.value) handleGetQuote();
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey || !quote) return;

    try {
      await executeSwap(quote);
      setQuote(null);
    } catch (error) {
      console.error('Swap error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Target Token */}
      <div className="space-y-2">
        <label className="block text-sm font-mono text-gray-400">Target Token</label>
        <select
          value={formData.targetMint}
          onChange={e => {
            setFormData(prev => ({ ...prev, targetMint: e.target.value }));
            if (formData.amount) handleGetQuote();
          }}
          className="w-full bg-black border border-swiss-red/20 p-3 font-mono text-sm rounded-none focus:outline-none focus:border-swiss-red"
        >
          <option value="">Select Token</option>
          {Object.entries(TOKENS).map(([symbol, address]) => (
            <option key={symbol} value={address}>{symbol}</option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <label className="block text-sm font-mono text-gray-400">Amount (SOL)</label>
        <input
          type="number"
          value={formData.amount}
          onChange={handleAmountChange}
          className="w-full bg-black border border-swiss-red/20 p-3 font-mono text-sm rounded-none focus:outline-none focus:border-swiss-red"
          placeholder="0.0"
          step="0.01"
          min="0"
        />
      </div>

      {/* Slippage */}
      <div className="space-y-2">
        <label className="block text-sm font-mono text-gray-400">Slippage (%)</label>
        <input
          type="number"
          value={formData.slippage}
          onChange={e => {
            setFormData(prev => ({ ...prev, slippage: e.target.value }));
            if (formData.amount) handleGetQuote();
          }}
          className="w-full bg-black border border-swiss-red/20 p-3 font-mono text-sm rounded-none focus:outline-none focus:border-swiss-red"
          placeholder="1.0"
          step="0.1"
          min="0.1"
          max="100"
        />
      </div>

      {/* Quote Display */}
      <QuoteDisplay quote={quote} isLoading={isQuoteLoading} />

      {/* Swap Button */}
      <button
        type="submit"
        disabled={isLoading || !publicKey || !quote}
        className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white py-3 px-4 font-mono disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Icons.ArrowRightLeft className="w-4 h-4" />
        {isLoading ? 'Loading...' : 'Swap'}
      </button>
    </form>
  );
}