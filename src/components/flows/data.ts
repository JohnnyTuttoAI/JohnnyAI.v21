```typescript
export const flowData = Array.from({ length: 30 }, (_, i) => ({
  timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
  value: Math.random() * 1000000000 + 500000000,
  type: Math.random() > 0.5 ? 'inflow' : 'outflow'
}));

export const whaleActivity = [
  {
    address: '0x1234...5678',
    type: 'accumulation',
    amount: 15000000,
    token: 'ETH',
    timestamp: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    address: '0x8765...4321',
    type: 'distribution',
    amount: 8000000,
    token: 'BTC',
    timestamp: new Date(Date.now() - 15 * 60 * 1000)
  },
  // Add more whale activities...
];

export const institutionalMetrics = {
  netFlow: 2500000000,
  activeWallets: 1250,
  averagePosition: 12000000,
  dominance: 0.65,
  topHoldings: [
    { token: 'BTC', amount: 450000, value: 18000000000 },
    { token: 'ETH', amount: 3800000, value: 8000000000 },
    { token: 'SOL', amount: 25000000, value: 2000000000 }
  ]
};
```