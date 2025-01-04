import React from 'react';
import ConnectButton from '../wallet/ConnectButton';

export default function TopBar() {
  return (
    <div className="fixed top-0 right-0 left-0 lg:left-60 h-16 bg-black/50 backdrop-blur-sm border-b border-white/10 z-40">
      <div className="h-full flex items-center justify-center lg:justify-end px-4">
        <ConnectButton />
      </div>
    </div>
  );
}