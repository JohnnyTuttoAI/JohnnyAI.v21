export const FLARE_METRICS = {
  performance: {
    tps: 1000,
    blockTime: 0.5,
    finalityTime: 2,
    gasEfficiency: 0.9
  },
  
  security: {
    validators: 100,
    ftsoProviders: 50,
    attestationThreshold: 0.8,
    networkUptime: 0.9999
  },

  economics: {
    circulatingSupply: 11_475_000_000,
    totalSupply: 100_000_000_000,
    inflationRate: 0.025,
    stakingYield: {
      ftso: 0.1,
      delegation: 0.05
    }
  }
} as const;