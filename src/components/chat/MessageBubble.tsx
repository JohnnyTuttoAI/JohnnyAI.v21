import React from 'react';
import { Icons } from '../icons';
import { ChatMessage } from '../../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={`flex items-start space-x-3 ${
      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
    }`}>
      <div className={`p-2 rounded-full ${
        message.type === 'bot' ? 'bg-swiss-red' : 'bg-cyber-blue'
      }`}>
        {message.type === 'bot' ? 
          <Icons.Bot className="w-5 h-5 text-white" /> : 
          <Icons.User className="w-5 h-5 text-white" />
        }
      </div>
      <div className={`px-4 py-2 rounded-lg max-w-[80%] ${
        message.type === 'bot' 
          ? 'bg-black/50 border border-swiss-red/20 text-white' 
          : 'bg-cyber-blue/10 border border-cyber-blue/20 text-white'
      }`}>
        <p className="font-mono text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}