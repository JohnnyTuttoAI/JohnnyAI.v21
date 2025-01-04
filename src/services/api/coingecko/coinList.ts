// Top 100 coins by market cap and popular categories
export const FEATURED_COINS = {
  defi: [
    'uniswap', 'aave', 'maker', 'compound', 'curve-dao-token', 
    'pancakeswap-token', '1inch', 'sushi', 'yearn-finance'
  ],
  l1: [
    'bitcoin', 'ethereum', 'solana', 'cardano', 'avalanche-2',
    'polkadot', 'cosmos', 'near', 'algorand'
  ],
  l2: [
    'polygon', 'optimism', 'arbitrum', 'immutable-x', 
    'loopring', 'zkspace', 'starknet'
  ],
  meme: [
    'dogecoin', 'shiba-inu', 'pepe', 'floki', 'wojak'
  ],
  gaming: [
    'axie-infinity', 'decentraland', 'the-sandbox', 'gala',
    'enjincoin', 'ultra', 'gods-unchained'
  ],
  stablecoins: [
    'tether', 'usd-coin', 'dai', 'frax'
  ]
} as const;