import React from 'react';
import { ChatMessage } from '../../types';
import MessageBubble from './MessageBubble';
import LoadingIndicator from '../ui/LoadingIndicator';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}
      {isLoading && <LoadingIndicator />}
    </div>
  );
}