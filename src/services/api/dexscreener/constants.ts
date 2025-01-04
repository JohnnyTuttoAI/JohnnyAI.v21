export const API_CONFIG = {
  baseUrl: 'https://api.dexscreener.com/latest',
  rateLimit: 2000, // 2 seconds between requests
  timeout: 10000,  // 10 second timeout
} as const;

export const PAIR_THRESHOLDS = {
  liquidity: {
    high: 1000000,    // $1M+
    medium: 250000,   // $250K+
    low: 50000        // $50K+
  },
  volume24h: {
    high: 500000,     // $500K+
    medium: 100000,   // $100K+
    low: 25000        // $25K+
  },
  txCount24h: {
    high: 1000,       // 1000+ transactions
    medium: 500,      // 500+ transactions
    low: 100          // 100+ transactions
  }
} as const;