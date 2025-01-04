export const FLARE_NETWORK = {
  specs: {
    type: 'Layer 1',
    consensus: 'Federated Network Consensus (FNC)',
    blockTime: '0.5 seconds',
    finality: '2-4 seconds',
    security: 'State Connector + FTSO',
  },
  
  tokens: {
    FLR: {
      role: 'Native token',
      utility: ['Governance', 'Gas', 'FTSO', 'Collateral'],
      distribution: '15% initial, 85% over 36 months'
    },
    SGB: {
      role: 'Songbird canary network token',
      utility: ['Testing', 'Governance', 'DeFi'],
      distribution: 'Airdrop to XRP holders'
    }
  },

  ecosystem: {
    core: [
      'State Connector',
      'FTSO (Flare Time Series Oracle)',
      'LayerCake',
      'FAssets'
    ],
    defi: [
      'Flare Finance',
      'GFLA Finance',
      'Sparkles',
      'AgencyFi'
    ]
  },

  features: {
    stateConnector: {
      purpose: 'Cross-chain attestation',
      capabilities: [
        'Payment finality',
        'Account balance',
        'Smart contract state'
      ]
    },
    ftso: {
      purpose: 'Decentralized price oracle',
      providers: 'Data providers stake FLR',
      accuracy: 'Time-weighted voting system'
    },
    fassets: {
      purpose: 'Trustless wrapped assets',
      supported: ['BTC', 'XRP', 'DOGE', 'LTC', 'ADA'],
      collateral: 'FLR or approved assets'
    }
  }
} as const;