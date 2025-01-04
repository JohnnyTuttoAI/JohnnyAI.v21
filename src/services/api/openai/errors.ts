export class OpenAIError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'OpenAIError';
  }
}

export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'OpenAI API key is not configured',
  INVALID_API_KEY: 'Invalid OpenAI API key format',
  INVALID_REQUEST: 'Invalid request to OpenAI API',
  INVALID_RESPONSE: 'Invalid response from OpenAI API',
  RATE_LIMIT: 'Rate limit exceeded',
  GENERAL_ERROR: 'An error occurred while processing your request'
} as const;