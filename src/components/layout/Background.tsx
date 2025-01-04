import React from 'react';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-swiss-grid bg-repeat opacity-[0.02]"></div>
      
      {/* Animated gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyber-blue/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyber-purple/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 bg-scanlines opacity-[0.02]"></div>
    </div>
  );
}