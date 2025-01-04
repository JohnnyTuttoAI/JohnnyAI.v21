import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, arbitrum, optimism, base } from 'wagmi/chains';
import { http } from 'viem';
import { config } from './env';

export const walletConfig = getDefaultConfig({
  appName: 'JOHNNY.AI',
  projectId: config.wallet.projectId,
  chains: [mainnet, arbitrum, optimism, base],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
  ssr: false
});