import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export default function NavLink({ to, icon, label, onClick }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-swiss-red/10 text-swiss-red' 
          : 'text-white/80 hover:text-swiss-red hover:bg-swiss-red/5'
      }`}
    >
      {icon}
      <span className="font-swiss text-sm">{label}</span>
    </Link>
  );
}