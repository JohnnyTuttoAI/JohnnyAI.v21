```typescript
export const POLYGON_CONFIG = {
  apiKey: 'PpVz0FJr2lg1P0wOwurI9ApOEI4fpzm3',
  baseUrl: 'https://api.polygon.io/v2',
  wsUrl: 'wss://socket.polygon.io/stocks',
  rateLimit: 1000, // 1 request per second
} as const;
```