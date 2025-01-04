import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`relative ${sizes[size]}`}>
      {/* Logo Container */}
      <div className="absolute inset-0 border-2 border-swiss-red">
        <img
          src="https://i.ibb.co/SmnTg32/jkohnnny.png"
          alt="Johnny AI"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Cyber Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 mix-blend-overlay"></div>
      
      {/* AI Badge */}
      <div className="absolute -top-2 right-0 bg-cyber-blue px-1">
        <span className="text-[8px] font-mono text-black font-bold">AI</span>
      </div>
    </div>
  );
}