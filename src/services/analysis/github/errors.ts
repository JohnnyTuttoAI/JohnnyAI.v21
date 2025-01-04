export class GithubError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code: string = ERROR_CODES.UNKNOWN_ERROR
  ) {
    super(message);
    this.name = 'GithubError';
  }
}

export const ERROR_CODES = {
  FETCH_ERROR: 'FETCH_ERROR',
  INVALID_URL: 'INVALID_URL',
  NOT_FOUND: 'NOT_FOUND',
  RATE_LIMIT: 'RATE_LIMIT',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
} as const;

export const ERROR_MESSAGES = {
  [ERROR_CODES.FETCH_ERROR]: 'Failed to fetch contract source. Please try again.',
  [ERROR_CODES.INVALID_URL]: 'Invalid GitHub URL format. Use: owner/repo/path or full GitHub URL',
  [ERROR_CODES.NOT_FOUND]: 'Contract file not found. Please check the URL.',
  [ERROR_CODES.RATE_LIMIT]: 'GitHub API rate limit exceeded. Please try again later.',
  [ERROR_CODES.NETWORK_ERROR]: 'Network error - Please check your connection.',
  [ERROR_CODES.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.'
} as const;