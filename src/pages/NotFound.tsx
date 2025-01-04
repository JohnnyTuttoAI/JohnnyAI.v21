import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/icons';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="text-swiss-red">
          <Icons.Bot className="w-16 h-16 mx-auto" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-swiss">404 - Page Not Found</h1>
          <p className="text-gray-400 font-mono">The requested page does not exist.</p>
        </div>

        <Link 
          to="/"
          className="inline-flex items-center space-x-2 text-swiss-red hover:text-cyber-blue transition-colors"
        >
          <Icons.ArrowLeft className="w-4 h-4" />
          <span className="font-mono">Return Home</span>
        </Link>
      </div>
    </div>
  );
}