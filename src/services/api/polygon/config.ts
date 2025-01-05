```typescript
export const POLYGON_CONFIG = {
  apiKey: '',
  baseUrl: 'https://api.polygon.io/v2',
  wsUrl: 'wss://socket.polygon.io/stocks',
  rateLimit: 1000, // 1 request per second
} as const;
```
