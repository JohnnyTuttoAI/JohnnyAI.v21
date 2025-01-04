import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createConfig } from 'wagmi';
import { http } from 'viem';
import { supportedChains } from './chains';
import { config } from '../env';

const { connectors } = getDefaultWallets({
  appName: 'JOHNNY.AI',
  projectId: config.wallet.projectId,
  chains: supportedChains
});

export const wagmiConfig = createConfig({
  chains: supportedChains,
  transports: {
    [supportedChains[0].id]: http(),
    [supportedChains[1].id]: http(),
  },
  connectors
});