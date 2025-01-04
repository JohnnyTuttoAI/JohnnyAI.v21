import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icons } from '../icons';
import Logo from '../brand/Logo';
import NavLink from './navigation/NavLink';
import MobileMenu from './navigation/MobileMenu';
import SocialLinks from './navigation/SocialLinks';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <MobileMenu isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />

      <aside className={`fixed inset-y-0 left-0 w-full lg:w-60 bg-black/95 backdrop-blur-sm border-r border-white/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <Logo />
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
            <div>
              <h3 className="text-xs font-swiss text-gray-500 uppercase mb-4">Intelligence</h3>
              <div className="space-y-1">
                <NavLink to="/contract-agent" icon={<Icons.Brain className="w-5 h-5" />} label="Smart Audit" onClick={() => handleNavClick('/contract-agent')} />
                <NavLink to="/corp-audit" icon={<Icons.Building2 className="w-5 h-5" />} label="Corp Audit" onClick={() => handleNavClick('/corp-audit')} />
                <NavLink to="/chat" icon={<Icons.MessageSquare className="w-5 h-5" />} label="AI Assistant" onClick={() => handleNavClick('/chat')} />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-swiss text-gray-500 uppercase mb-4">Market Analysis</h3>
              <div className="space-y-1">
                <NavLink to="/trading-agent" icon={<Icons.TrendingUp className="w-5 h-5" />} label="Trade Scanner" onClick={() => handleNavClick('/trading-agent')} />
                <NavLink to="/market-agent" icon={<Icons.BarChart2 className="w-5 h-5" />} label="Flow Analysis" onClick={() => handleNavClick('/market-agent')} />
                <NavLink to="/social-agent" icon={<Icons.Users className="w-5 h-5" />} label="Social Signals" onClick={() => handleNavClick('/social-agent')} />
              </div>
            </div>

            <div>
              <div className="space-y-1">
                <NavLink to="/docs" icon={<Icons.FileText className="w-5 h-5" />} label="Documentation" onClick={() => handleNavClick('/docs')} />
              </div>
            </div>
          </nav>

          <SocialLinks />
        </div>
      </aside>
    </>
  );
}