import { useAccount, useNetwork, useBalance } from 'wagmi';
import { useSolanaConnection } from './useSolanaConnection';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: balance } = useBalance({
    address,
  });
  const solanaConnection = useSolanaConnection();

  return {
    address,
    isConnected,
    chain,
    balance,
    solanaConnection,
  };
}