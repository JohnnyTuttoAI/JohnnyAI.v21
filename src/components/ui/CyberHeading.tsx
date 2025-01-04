import React from 'react';

interface CyberHeadingProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3;
}

export default function CyberHeading({ children, className = '', level = 1 }: CyberHeadingProps) {
  const baseStyle = 'font-display tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink animate-glow';
  
  const sizes = {
    1: 'text-6xl md:text-7xl',
    2: 'text-4xl md:text-5xl',
    3: 'text-2xl md:text-3xl'
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`${baseStyle} ${sizes[level]} ${className}`}>
      {children}
    </Tag>
  );
}