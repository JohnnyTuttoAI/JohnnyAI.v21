import { useAccount } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';

export function useWalletConnection() {
  const { isConnected: isEVMConnected, address: evmAddress } = useAccount();
  const { connected: isSolanaConnected, publicKey } = useWallet();

  return {
    isEVMConnected,
    isSolanaConnected,
    evmAddress,
    solanaAddress: publicKey?.toBase58(),
    isAnyWalletConnected: isEVMConnected || isSolanaConnected
  };
}