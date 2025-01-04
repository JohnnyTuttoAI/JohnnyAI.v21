import React from 'react';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  onClick: () => void;
}

export default function QuickAction({ icon, label, sublabel, onClick }: QuickActionProps) {
  return (
    <button 
      onClick={onClick}
      className="group bg-black/50 border border-white/10 p-4 hover:border-swiss-red transition-colors w-full"
    >
      <div className="flex items-center space-x-3">
        <div className="text-swiss-red group-hover:text-cyber-blue transition-colors">
          {icon}
        </div>
        <div className="text-left">
          <div className="font-swiss text-sm">{label}</div>
          <div className="font-mono text-xs text-gray-500">{sublabel}</div>
        </div>
      </div>
    </button>
  );
}