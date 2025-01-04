import { config } from '../../../config/env';

export const OPENAI_CONFIG = {
  apiKey: config.openai.apiKey,
  baseURL: config.openai.baseUrl,
  dangerouslyAllowBrowser: true
} as const;