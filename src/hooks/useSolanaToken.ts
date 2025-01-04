import { useState, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { deployToken } from '../services/solana/token';
import { toast } from 'react-hot-toast';
import { Keypair } from '@solana/web3.js';

export function useSolanaToken() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = useCallback(async (
    name: string,
    symbol: string,
    decimals: number = 9,
    initialSupply: number = 1000000
  ) => {
    if (!publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsDeploying(true);
    try {
      // Note: In production, never expose private keys like this
      // This is just for demo purposes
      const payer = Keypair.generate();
      
      const result = await deployToken(
        connection,
        payer,
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
      setIsDeploying(false);
    }
  }, [connection, publicKey]);

  return {
    deployToken: handleDeploy,
    isDeploying
  };
}