import { useState, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { solanaAgentService } from '../services/solana/agent/service';
import { toast } from 'react-hot-toast';
import type { TokenDeployResult, SwapResult } from '../services/solana/agent/types';

export function useSolanaAgent() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initializeAgent = useCallback(async (privateKey: string) => {
    try {
      setIsLoading(true);
      await solanaAgentService.initialize(privateKey);
      setIsInitialized(true);
      toast.success('Solana agent initialized');
    } catch (error) {
      console.error('Failed to initialize Solana agent:', error);
      toast.error('Failed to initialize Solana agent');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deployToken = useCallback(async (
    name: string,
    symbol: string,
    decimals: number = 9,
    initialSupply: number = 1000000
  ): Promise<TokenDeployResult | undefined> => {
    if (!isInitialized) {
      toast.error('Please initialize the Solana agent first');
      return;
    }

    try {
      setIsLoading(true);
      const result = await solanaAgentService.deployToken(
        name,
        symbol,
        decimals,
        initialSupply
      );
      
      toast.success(`Token deployed! Mint: ${result.mint.toString()}`);
      return result;
    } catch (error) {
      console.error('Token deployment error:', error);
      toast.error('Failed to deploy token');
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  const swapTokens = useCallback(async (
    targetMint: string,
    amount: number,
    sourceMint: string,
    slippage?: number
  ): Promise<SwapResult | undefined> => {
    if (!isInitialized) {
      toast.error('Please initialize the Solana agent first');
      return;
    }

    try {
      setIsLoading(true);
      const result = await solanaAgentService.swapTokens(
        targetMint,
        amount,
        sourceMint,
        slippage
      );
      
      toast.success('Swap executed successfully');
      return result;
    } catch (error) {
      console.error('Token swap error:', error);
      toast.error('Failed to execute swap');
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  return {
    isInitialized,
    isLoading,
    initializeAgent,
    deployToken,
    swapTokens,
    publicKey
  };
}