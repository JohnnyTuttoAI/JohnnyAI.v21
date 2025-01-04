import React from 'react';
import { formatCurrency } from '../../../utils/formatters';
import type { QuoteResponse } from '../../../services/api/pumpfun/types';

interface QuoteDisplayProps {
  quote: QuoteResponse | null;
  isLoading: boolean;
}

export default function QuoteDisplay({ quote, isLoading }: QuoteDisplayProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse bg-black/30 border border-swiss-red/20 p-4 space-y-2">
        <div className="h-4 bg-swiss-red/10 rounded w-1/2"></div>
        <div className="h-4 bg-swiss-red/10 rounded w-3/4"></div>
      </div>
    );
  }

  if (!quote) return null;

  const outAmount = quote.outAmount / Math.pow(10, 6); // Convert from lamports

  return (
    <div className="bg-black/30 border border-swiss-red/20 p-4 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-mono text-gray-400">You'll receive</span>
        <span className="font-mono text-cyber-blue">
          {outAmount.toLocaleString()} tokens
        </span>
      </div>
      <div className="text-xs font-mono text-gray-500">
        1 SOL = {(outAmount / (quote.inAmount / 1e9)).toFixed(2)} tokens
      </div>
    </div>
  );
}