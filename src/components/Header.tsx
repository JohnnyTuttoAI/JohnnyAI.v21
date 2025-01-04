import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from './icons';
import ConnectButton from './wallet/ConnectButton';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Swiss Grid Background */}
      <div className="absolute inset-0 bg-swiss-grid opacity-5"></div>
      
      {/* Blur Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      
      {/* Red Line - Swiss Design Element */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-swiss-red"></div>

      {/* Content */}
      <div className="relative max-w-screen-2xl mx-auto px-8 py-4">
        <div className="grid grid-cols-3 items-center">
          {/* Left Navigation */}
          <nav className="flex items-center space-x-8">
            <Link to="/markets" className="font-swiss text-sm text-white hover:text-swiss-red transition">MARKETS</Link>
            <Link to="/collection" className="font-swiss text-sm text-white hover:text-swiss-red transition">COLLECTION</Link>
          </nav>

          {/* Center Logo */}
          <Link to="/" className="justify-self-center flex items-center space-x-3">
            <div className="relative w-10 h-10 border-2 border-swiss-red">
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 mix-blend-overlay"></div>
              <span className="absolute -top-5 right-0 font-mono text-[10px] text-cyber-blue">AI</span>
            </div>
            <div className="text-center">
              <h1 className="font-swiss text-lg font-bold tracking-wider text-white">JOHNNY</h1>
              <span className="font-mono text-xs text-swiss-red">SWISS MARKET ORACLE</span>
            </div>
          </Link>

          {/* Right Navigation */}
          <div className="flex items-center justify-end space-x-8">
            <Link to="/chat" className="font-swiss text-sm text-white hover:text-swiss-red transition">CHAT</Link>
            <a 
              href="https://twitter.com/Johnny__AI" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-swiss-red transition"
            >
              <Icons.Twitter className="w-5 h-5" />
            </a>
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}