import React from 'react';
import { Link } from 'react-router-dom';

interface CyberButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function CyberButton({ 
  children, 
  to, 
  onClick, 
  variant = 'primary',
  className = '' 
}: CyberButtonProps) {
  const baseStyle = 'relative font-display px-8 py-4 overflow-hidden rounded-lg transition-all duration-300';
  
  const variants = {
    primary: 'bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-blue text-white',
    secondary: 'border border-cyber-blue hover:bg-cyber-blue/20 text-cyber-blue'
  };

  const content = (
    <>
      <div className="relative z-10 flex items-center space-x-2">
        {children}
      </div>
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-50 blur-xl transition-all duration-300 bg-gradient-to-r from-cyber-blue to-cyber-purple"></div>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseStyle} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {content}
    </button>
  );
}