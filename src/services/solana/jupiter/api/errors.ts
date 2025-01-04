export class JupiterError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code: string = ERROR_CODES.UNKNOWN_ERROR
  ) {
    super(message);
    this.name = 'JupiterError';
  }
}

export const ERROR_CODES = {
  API_ERROR: 'API_ERROR',
  QUOTE_FAILED: 'QUOTE_FAILED',
  SWAP_FAILED: 'SWAP_FAILED',
  BALANCE_ERROR: 'BALANCE_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
} as const;