import React from 'react';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { Icons } from '../icons';
import { WalletButtonContainer } from './WalletButtonContainer';
import { useWalletError } from '../../hooks/useWalletError';

export default function EVMConnectButton() {
  const { handleError } = useWalletError();

  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!ready) return null;

        const handleConnect = async () => {
          try {
            await openConnectModal();
          } catch (error) {
            handleError(error);
          }
        };

        if (!connected) {
          return (
            <WalletButtonContainer onClick={handleConnect}>
              <Icons.Wallet className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs md:text-base whitespace-nowrap">Connect EVM</span>
            </WalletButtonContainer>
          );
        }

        if (chain.unsupported) {
          return (
            <WalletButtonContainer 
              onClick={openChainModal}
              variant="error"
            >
              <span className="text-xs md:text-base">Wrong Network</span>
            </WalletButtonContainer>
          );
        }

        return (
          <div className="flex items-center gap-2 md:gap-4">
            <WalletButtonContainer onClick={openChainModal}>
              {chain.hasIcon && chain.iconUrl && (
                <img
                  alt={chain.name ?? 'Chain icon'}
                  src={chain.iconUrl}
                  className="w-3 h-3 md:w-4 md:h-4"
                />
              )}
              <span className="text-xs md:text-base hidden md:inline">{chain.name}</span>
            </WalletButtonContainer>

            <WalletButtonContainer onClick={openAccountModal}>
              <span className="text-xs md:text-base truncate max-w-[80px] md:max-w-none">
                {account.displayName}
              </span>
            </WalletButtonContainer>
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}