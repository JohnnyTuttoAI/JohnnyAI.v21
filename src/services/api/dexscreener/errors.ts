export class DexScreenerError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'DexScreenerError';
  }
}

export const ERROR_CODES = {
  RATE_LIMIT: 'RATE_LIMIT',
  TIMEOUT: 'TIMEOUT',
  INVALID_RESPONSE: 'INVALID_RESPONSE',
  NETWORK_ERROR: 'NETWORK_ERROR',
  INVALID_PAIR: 'INVALID_PAIR'
} as const;