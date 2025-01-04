import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getTokenBalances } from '../services/solana/helius/balance';

export function useHeliusBalance() {
  const { publicKey } = useWallet();
  const [balances, setBalances] = useState<{
    sol: number;
    tokens: Array<{
      mint: string;
      amount: number;
      decimals: number;
    }>;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchBalances() {
      if (!publicKey) return;
      
      setIsLoading(true);
      try {
        const data = await getTokenBalances(publicKey.toString());
        setBalances(data);
      } catch (error) {
        console.error('Error fetching balances:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBalances();
    // Refresh every 30 seconds
    const interval = setInterval(fetchBalances, 30000);
    
    return () => clearInterval(interval);
  }, [publicKey]);

  return { balances, isLoading };
}