import React from 'react';

interface WalletButtonContainerProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'error';
}

export function WalletButtonContainer({ 
  children, 
  onClick, 
  variant = 'default' 
}: WalletButtonContainerProps) {
  const colors = {
    default: 'bg-swiss-red',
    error: 'bg-red-500'
  };

  return (
    <button onClick={onClick} className="relative group">
      <div className={`absolute -inset-0.5 ${colors[variant]} rounded-none opacity-30 group-hover:opacity-50 transition duration-1000`}></div>
      <div className="relative bg-black px-2 py-1.5 md:px-6 md:py-2 font-mono text-[10px] md:text-base text-white border border-swiss-red/20 hover:border-swiss-red/40 transition-all flex items-center gap-1 md:gap-2">
        {children}
      </div>
    </button>
  );
}