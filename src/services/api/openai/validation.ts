import { OpenAIError, ERROR_MESSAGES } from './errors';

export function validateApiKey(apiKey: string | undefined): string {
  if (!apiKey) {
    throw new OpenAIError(ERROR_MESSAGES.API_KEY_MISSING);
  }
  
  if (!apiKey.startsWith('sk-')) {
    throw new OpenAIError(ERROR_MESSAGES.INVALID_API_KEY);
  }
  
  return apiKey;
}

export function validateResponse(response: any): string {
  if (!response?.choices?.[0]?.message?.content) {
    throw new OpenAIError(ERROR_MESSAGES.INVALID_RESPONSE);
  }
  
  return response.choices[0].message.content;
}