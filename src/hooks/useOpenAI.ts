import { useState } from 'react';
import { openAIService } from '../services/api/openai';
import { ChatMessage } from '../types';
import { toast } from 'react-hot-toast';

export function useOpenAI() {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string): Promise<string> => {
    setIsLoading(true);
    try {
      const response = await openAIService.getChatCompletion(message);
      return response;
    } catch (error) {
      toast.error('Failed to get AI response. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    isLoading
  };
}