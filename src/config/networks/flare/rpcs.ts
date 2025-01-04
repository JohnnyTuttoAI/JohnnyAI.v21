```typescript
// Primary and fallback RPC endpoints for Flare Network
export const FLARE_RPCS = {
  primary: [
    'https://flare-api.flare.network/ext/C/rpc',
    'https://flare.blockpi.network/v1/rpc/public',
    'https://rpc.ftso.au/flare',
    'https://rpc.ankr.com/flare'
  ],
  
  fallback: [
    'https://flare-api.dcent.io/v1',
    'https://flare.public-rpc.com',
    'https://flare-pokt.nodies.app'
  ],

  // Dedicated RPCs for specific purposes
  specialized: {
    ftso: 'https://flare-ftso.flare.network/ext/bc/C/rpc',
    stateConnector: 'https://flare-sc.flare.network/ext/bc/C/rpc',
    attestation: 'https://flare-attestation.flare.network/ext/bc/C/rpc'
  },

  // WebSocket endpoints
  websocket: [
    'wss://flare-api.flare.network/ext/bc/C/ws',
    'wss://flare.blockpi.network/v1/ws/public'
  ]
};