import React, { useState } from 'react';
import { useSolanaAgent } from '../../hooks/useSolanaAgent';
import { Icons } from '../icons';
import { toast } from 'react-hot-toast';

export default function TokenDeployer() {
  const { deployToken, isInitialized } = useSolanaAgent();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    decimals: 9,
    initialSupply: 1000000
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isInitialized) {
      toast.error('Please initialize agent first');
      return;
    }

    try {
      await deployToken(
        formData.name,
        formData.symbol,
        formData.decimals,
        formData.initialSupply
      );
    } catch (error) {
      console.error('Token deployment error:', error);
    }
  };

  return (
    <div className="p-6 bg-black/50 border border-swiss-red/20">
      <h2 className="text-2xl font-swiss mb-6">Deploy Solana Token</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-mono mb-2">Token Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full bg-black border border-swiss-red/20 p-2 font-mono"
            placeholder="My Token"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-mono mb-2">Symbol</label>
          <input
            type="text"
            value={formData.symbol}
            onChange={e => setFormData(prev => ({ ...prev, symbol: e.target.value }))}
            className="w-full bg-black border border-swiss-red/20 p-2 font-mono"
            placeholder="TKN"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-mono mb-2">Decimals</label>
            <input
              type="number"
              value={formData.decimals}
              onChange={e => setFormData(prev => ({ ...prev, decimals: parseInt(e.target.value) }))}
              className="w-full bg-black border border-swiss-red/20 p-2 font-mono"
              min="0"
              max="9"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-mono mb-2">Initial Supply</label>
            <input
              type="number"
              value={formData.initialSupply}
              onChange={e => setFormData(prev => ({ ...prev, initialSupply: parseInt(e.target.value) }))}
              className="w-full bg-black border border-swiss-red/20 p-2 font-mono"
              min="1"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isInitialized}
          className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white py-2 px-4 font-mono disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Icons.Bot className="w-4 h-4" />
          Deploy Token
        </button>
      </form>
    </div>
  );
}