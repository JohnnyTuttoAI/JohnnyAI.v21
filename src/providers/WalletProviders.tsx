import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { SolanaProvider } from './SolanaProvider';
import { wagmiConfig } from '../config/wallet/providers';
import { darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const customTheme = darkTheme({
  accentColor: '#FF0000', // Swiss red
  accentColorForeground: 'white',
  borderRadius: 'none',
  fontStack: 'system',
  overlayBlur: 'small',
});

export function WalletProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>
          <SolanaProvider>
            {children}
          </SolanaProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}