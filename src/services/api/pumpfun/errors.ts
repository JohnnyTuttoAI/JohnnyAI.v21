export class PumpFunError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number
  ) {
    super(message);
    this.name = 'PumpFunError';
  }
}

export const ERROR_CODES = {
  RATE_LIMIT: 'RATE_LIMIT',
  INVALID_REQUEST: 'INVALID_REQUEST',
  NETWORK_ERROR: 'NETWORK_ERROR',
  QUOTE_ERROR: 'QUOTE_ERROR'
} as const;