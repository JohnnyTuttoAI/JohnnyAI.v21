import React from 'react';
import { Icons } from '../../icons';

export default function SocialLinks() {
  return (
    <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10">
      <div className="flex items-center space-x-4">
        <a 
          href="https://twitter.com/Johnny__AI" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-swiss-red transition-colors"
        >
          <Icons.Twitter className="w-5 h-5" />
        </a>
        <a 
          href="https://github.com/JohnnyTuttoAI" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-swiss-red transition-colors"
        >
          <Icons.FileText className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}