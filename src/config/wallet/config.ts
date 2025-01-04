import { http } from 'viem';
import { mainnet, base } from 'viem/chains';
import { config } from '../env';
import { supportedChains } from './chains';

export const walletConfig = {
  chains: supportedChains,
  projectId: config.wallet.projectId,
  appName: 'JOHNNY.AI',
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  }
} as const;