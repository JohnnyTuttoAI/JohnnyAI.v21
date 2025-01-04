import React, { useState } from 'react';
import { useOpenAI } from '../../hooks/useOpenAI';
import { ChatMessage } from '../../types';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { AI_IDENTITY } from '../../config/constants';

export default function ChatContainer() {
  const { sendMessage, isLoading } = useOpenAI();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: 'bot', content: AI_IDENTITY.greeting }
  ]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content }]);

    try {
      // Get AI response
      const response = await sendMessage(content);
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/50 backdrop-blur-sm rounded-lg border border-swiss-red/20">
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}