import { useState, useCallback } from 'react';
import { ChatMessage } from '../types';
import { useOpenAI } from './useOpenAI';
import { AI_IDENTITY } from '../config/constants';

export function useChat() {
  const { sendMessage, isLoading } = useOpenAI();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: 'bot', content: AI_IDENTITY.greeting }
  ]);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message immediately
    setMessages(prev => [...prev, { type: 'user', content }]);

    try {
      // Get AI response
      const response = await sendMessage(content);
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    } catch (error) {
      // Add error message
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'I encountered an error. Please try again.' 
      }]);
    }
  }, [sendMessage]);

  return {
    messages,
    isLoading,
    sendMessage: handleSendMessage
  };
}