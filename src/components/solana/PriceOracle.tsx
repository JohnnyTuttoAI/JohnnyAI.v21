import React, { useState } from 'react';
import { useSolanaAgent } from '../../hooks/useSolanaAgent';
import { Icons } from '../icons';

export default function PriceOracle() {
  const { getPythPrice, isInitialized } = useSolanaAgent();
  const [priceAccount, setPriceAccount] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isInitialized || !priceAccount) return;

    setIsLoading(true);
    try {
      const fetchedPrice = await getPythPrice(priceAccount);
      setPrice(fetchedPrice);
    } catch (error) {
      console.error('Price fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-black/50 border border-swiss-red/20">
      <h2 className="text-2xl font-swiss mb-6">Pyth Price Oracle</h2>
      
      <form onSubmit={handleFetchPrice} className="space-y-4">
        <div>
          <label className="block text-sm font-mono mb-2">Price Account</label>
          <input
            type="text"
            value={priceAccount}
            onChange={e => setPriceAccount(e.target.value)}
            className="w-full bg-black border border-swiss-red/20 p-2 font-mono"
            placeholder="Pyth Price Account Address"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isInitialized || isLoading}
          className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white py-2 px-4 font-mono disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Icons.Search className="w-4 h-4" />
          Fetch Price
        </button>

        {price !== null && (
          <div className="mt-4 p-4 bg-black/30 border border-swiss-red/20">
            <p className="font-mono text-lg">Price: ${price.toFixed(6)}</p>
          </div>
        )}
      </form>
    </div>
  );
}