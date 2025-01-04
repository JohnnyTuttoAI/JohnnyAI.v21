import React, { useState } from 'react';
import { Icons } from './icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="p-4 border-t border-gray-800">
      <div className="max-w-4xl mx-auto flex items-center space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icons.Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}