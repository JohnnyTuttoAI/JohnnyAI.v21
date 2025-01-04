import React from 'react';
import { Icons } from './icons';
import { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={`flex items-start space-x-3 ${
      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
    }`}>
      <div className={`p-2 rounded-full ${
        message.type === 'bot' ? 'bg-pink-500' : 'bg-purple-500'
      }`}>
        {message.type === 'bot' ? 
          <Icons.Bot className="w-5 h-5 text-white" /> : 
          <Icons.User className="w-5 h-5 text-white" />
        }
      </div>
      <div className={`px-4 py-2 rounded-lg max-w-[80%] ${
        message.type === 'bot' 
          ? 'bg-gray-800 text-white' 
          : 'bg-pink-500 text-white'
      }`}>
        {message.content}
      </div>
    </div>
  );
}