import React from 'react';

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowingCard({ children, className = '' }: GlowingCardProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      
      {/* Content */}
      <div className="relative bg-gray-900 rounded-lg p-6 border border-gray-800">
        {children}
      </div>
    </div>
  );
}