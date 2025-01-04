export const config = {
  openai: {
    apiKey: '
    baseUrl: 'https://api.openai.com/v1'
  },
  coingecko: {
    apiKey: import.meta.env.VITE_COINGECKO_API_KEY || '',
    baseUrl: 'https://pro-api.coingecko.com/api/v3'
  },
  wallet: {
    projectId: import.meta.env.VITE_WALLET_PROJECT_ID || ''
  },
  polygon: {
    apiKey: '
    baseUrl: 'https://api.polygon.io/v2'
  },
  finnhub: {
    apiKey: 'c
    baseUrl: 'https://finnhub.io/api/v1'
  }
} as const;