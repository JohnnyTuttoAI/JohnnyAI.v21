import React from 'react';
import { Icons } from '../../icons';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  return (
    <>
      <button 
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-black/80 backdrop-blur-sm border border-swiss-red/20 rounded-lg"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <Icons.X className="w-5 h-5 text-swiss-red" />
        ) : (
          <Icons.Menu className="w-5 h-5 text-swiss-red" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
    </>
  );
}