import React from 'react';
import { useChat } from '../hooks/useChat';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import LoadingIndicator from './LoadingIndicator';

export default function ChatInterface() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-black">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {isLoading && <LoadingIndicator />}
      </div>

      {/* Input Area */}
      <div className="border-t border-swiss-red/20 p-4 bg-black/50 backdrop-blur-sm">
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}