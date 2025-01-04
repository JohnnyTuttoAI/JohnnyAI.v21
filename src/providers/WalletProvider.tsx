import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { walletConfig } from '../config/wallet/config';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const customTheme = darkTheme({
  accentColor: '#00F0FF',
  accentColorForeground: 'black',
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'small',
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={walletConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme} modalSize="compact">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}