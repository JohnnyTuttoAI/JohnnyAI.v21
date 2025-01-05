```typescript
export const FINNHUB_CONFIG = {
  apiKey: 
  baseUrl: 'https://finnhub.io/api/v1',
  wsUrl: 'wss://ws.finnhub.io',
  rateLimit: 1000 // 1 request per second
} as const;
```
