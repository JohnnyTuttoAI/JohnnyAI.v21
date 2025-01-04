import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Icons } from '../icons';
import { useWalletError } from '../../hooks/useWalletError';

export default function SolanaConnectButton() {
  const { connected } = useWallet();
  const { handleError } = useWalletError();

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative">
        <WalletMultiButton 
          className="!bg-[#674ea7] !backdrop-blur-sm !px-2 !py-1.5 md:!px-6 md:!py-2 !rounded-none !font-mono !text-xs md:!text-base !text-white !border !border-cyber-purple/20 hover:!border-cyber-purple/40 !transition-all !flex !items-center !gap-1 md:!gap-2 !min-w-0 !w-auto"
          startIcon={<Icons.Wallet className="w-3 h-3 md:w-4 md:h-4" />}
          onClick={(e) => {
            try {
              e.preventDefault();
              if (!connected) {
                // Handle connect
              }
            } catch (error) {
              handleError(error);
            }
          }}
        >
          {connected ? 'Connected' : 'Connect SOL'}
        </WalletMultiButton>
      </div>
    </div>
  );
}