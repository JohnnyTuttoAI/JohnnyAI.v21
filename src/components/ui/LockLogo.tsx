import React from 'react';

interface LockLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LockLogo({ size = 'md', className = '' }: LockLogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <img 
        src="https://i.ibb.co/zXmDTsf/locklogo.png"
        alt="Lock Logo" 
        className="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/10 to-cyber-purple/10 mix-blend-overlay rounded-lg"></div>
    </div>
  );
}