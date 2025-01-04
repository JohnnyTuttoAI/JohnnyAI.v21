import { FLARE_NETWORK } from '../../config/networks/flare';

export const TEE_CONFIG = {
  enclave: {
    type: 'Intel TDX',
    version: '1.0.0',
    attestationProtocol: 'DCAP',
    securityLevel: 'Production'
  },

  agentBoundaries: {
    allowedOperations: [
      'market_analysis',
      'trade_signals',
      'key_management',
      'transaction_signing'
    ],
    restrictedOperations: [
      'key_export',
      'memory_access',
      'network_direct'
    ]
  },

  keyManagement: {
    scheme: 'ECDSA',
    curve: 'secp256k1',
    derivationPath: "m/44'/60'/0'/0",
    rotationPeriod: 30 * 24 * 60 * 60 // 30 days
  },

  attestation: {
    interval: 300, // 5 minutes
    requiredValidators: 3,
    minimumConsensus: 0.67
  }
} as const;