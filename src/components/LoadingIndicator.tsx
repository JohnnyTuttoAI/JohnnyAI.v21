import React from 'react';

export default function LoadingIndicator() {
  return (
    <div className="flex justify-center py-4">
      <div className="space-x-2 flex items-center text-pink-500">
        <div className="w-2 h-2 rounded-full animate-pulse bg-current"></div>
        <div className="w-2 h-2 rounded-full animate-pulse bg-current" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 rounded-full animate-pulse bg-current" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}