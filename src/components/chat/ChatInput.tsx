import React, { useState } from 'react';
import { Icons } from '../icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    onSendMessage(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-swiss-red/20">
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about market structure, institutional flows, or degen setups..."
          disabled={isLoading}
          className="flex-1 bg-black/50 text-white px-4 py-2 rounded-none border border-swiss-red/20 focus:border-swiss-red focus:outline-none font-mono"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="text-swiss-red hover:text-cyber-blue transition-colors disabled:opacity-50"
        >
          <Icons.Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}