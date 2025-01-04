import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-4 group">
      <div className="relative w-12 h-12">
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
      
      <div className="flex flex-col">
        <span className="text-xl font-swiss font-bold tracking-tight text-white">JOHNNY</span>
        <span className="text-xs font-swiss text-swiss-red uppercase tracking-wider">Swiss Market Oracle</span>
      </div>
    </Link>
  );
}