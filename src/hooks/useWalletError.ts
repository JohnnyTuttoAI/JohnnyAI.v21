import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

export function useWalletError() {
  const handleError = useCallback((error: any) => {
    if (error?.code === 4001) {
      toast.error('Connection rejected. Please try again.');
      return;
    }

    if (error?.name === 'WalletConnectionError') {
      toast.error('Failed to connect wallet. Please try again.');
      return;
    }

    console.error('Wallet error:', error);
    toast.error('An unexpected error occurred. Please try again.');
  }, []);

  return { handleError };
}