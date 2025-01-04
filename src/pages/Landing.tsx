import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../components/icons';
import { useChat } from '../hooks/useChat';
import QuickAction from '../components/ui/QuickAction';
import Logo from '../components/ui/Logo';

export default function Landing() {
  const [input, setInput] = useState('');
  const { sendMessage } = useChat();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      navigate('/chat');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Swiss Grid Background */}
      <div className="fixed inset-0 bg-swiss-grid opacity-5 pointer-events-none"></div>
      
      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <div className="mb-8">
          <Logo />
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-swiss mb-2">
            How can <span className="text-swiss-red">Johnny</span> be of service?
          </h1>
          <p className="text-sm font-mono text-gray-400">
            Elite market intelligence powered by Swiss precision
          </p>
        </div>

        {/* Input Container */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about market structure, institutional flows, or degen setups..."
            className="w-full bg-black/50 border-2 border-swiss-red text-white px-6 py-4 rounded-none font-mono text-sm focus:outline-none focus:border-cyber-blue transition-colors"
          />
          <button 
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-swiss-red hover:text-cyber-blue transition-colors"
          >
            <Icons.Send className="w-5 h-5" />
          </button>
        </form>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-2xl">
          <QuickAction
            icon={<Icons.BarChart2 className="w-5 h-5" />}
            label="Market"
            sublabel="View market structure"
            onClick={() => navigate('/market-agent')}
          />
          <QuickAction
            icon={<Icons.TrendingUp className="w-5 h-5" />}
            label="Trade"
            sublabel="Execute trades"
            onClick={() => navigate('/trading-agent')}
          />
          <QuickAction
            icon={<Icons.Users className="w-5 h-5" />}
            label="Social"
            sublabel="Track sentiment"
            onClick={() => navigate('/social-agent')}
          />
          <QuickAction
            icon={<Icons.FileText className="w-5 h-5" />}
            label="Contract"
            sublabel="Audit contracts"
            onClick={() => navigate('/contract-agent')}
          />
        </div>
      </div>
    </div>
  );
}