import { useEffect, useState } from 'react';
import { Connection } from '@solana/web3.js';
import { solana } from '../config/networks';

export function useSolanaConnection() {
  const [connection, setConnection] = useState<Connection | null>(null);

  useEffect(() => {
    const conn = new Connection(solana.rpcUrls.default.http[0]);
    setConnection(conn);
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return connection;
}