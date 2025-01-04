import React from 'react';
import EVMConnectButton from './EVMConnectButton';
import SolanaConnectButton from './SolanaConnectButton';

export default function ConnectButton() {
  return (
    <div className="flex items-center gap-2 md:gap-4 scale-90 md:scale-100 origin-center">
      <EVMConnectButton />
      <SolanaConnectButton />
    </div>
  );
}