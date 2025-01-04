import React from 'react';
import { Link } from 'react-router-dom';

interface SwissButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function SwissButton({ 
  children, 
  to, 
  onClick, 
  variant = 'primary',
  className = '' 
}: SwissButtonProps) {
  const baseStyle = 'relative font-swiss inline-flex items-center justify-center';
  const variants = {
    primary: 'bg-swiss-red text-white hover:bg-swiss-red/90',
    secondary: 'border-2 border-swiss-red text-swiss-red hover:bg-swiss-red/10'
  };
  
  const content = (
    <>
      <div className="relative z-10 px-6 py-2">
        {children}
      </div>
      <div className="absolute top-0 right-0 h-2 w-2 bg-cyber-blue"></div>
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