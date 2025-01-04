export const JUPITER_CONFIG = {
  apiUrl: 'https://quote-api.jup.ag/v6',
  defaultSlippageBps: 100, // 1%
  priorityFee: 50000, // 0.00005 SOL per compute unit
  commonTokens: {
    SOL: "So11111111111111111111111111111111111111112",
    USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    BONK: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    WIF: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
    SAMO: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
  }
} as const;