import OpenAI from 'openai';
import { OPENAI_CONFIG } from './config';
import { SYSTEM_PROMPT } from './prompts';
import { OpenAIError, ERROR_MESSAGES } from './errors';
import { validateApiKey, validateResponse } from './validation';

class OpenAIService {
  private client: OpenAI;

  constructor() {
    const apiKey = validateApiKey(OPENAI_CONFIG.apiKey);
    this.client = new OpenAI({ ...OPENAI_CONFIG, apiKey });
  }

  async getChatCompletion(message: string): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 500
      });

      return validateResponse(completion);
    } catch (error: any) {
      if (error?.status === 429) {
        throw new OpenAIError(ERROR_MESSAGES.RATE_LIMIT);
      }
      console.error('OpenAI API Error:', error);
      throw new OpenAIError(ERROR_MESSAGES.GENERAL_ERROR);
    }
  }
}

export const openAIService = new OpenAIService();