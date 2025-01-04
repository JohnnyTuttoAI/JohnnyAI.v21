export const SOLANA_ECOSYSTEM = {
  // Core Infrastructure
  infrastructure: [
    'solana',
    'jito-networks',
    'pyth-network',
    'helium',
    'render-token',
    'bonfida'
  ],

  // DeFi Protocols
  defi: [
    'raydium',
    'marinade',
    'drift-protocol',
    'kamino-finance',
    'marginfi',
    'orca',
    'mean-finance',
    'jupiter',
    'mango-markets',
    'serum'
  ],

  // Meme Coins (Regularly Updated)
  memes: [
    'bonk',                  // BONK
    'dogwifhat',            // WIF
    'book-of-meme',         // MEME
    'myro',                 // MYRO
    'popcat',               // POPCAT
    'giga-protocol',        // GIGA
    'silly-dragon',         // SILLY
    'solcats',              // MEOW
    'samoyedcoin',          // SAMO
    'brain',                // BRAIN
    'cope-token',           // COPE
    'solape-token',         // SOLAPE
    'kitty-solana',         // KITTY
    'rendoge',              // RENDOGE
    'cato',                 // CATO
    'based-finance',        // BASED
    'smog-token',           // SMOG
    'dinari',               // DINI
    'slerf',                // SLERF
    'solanasail',           // SAIL
    'solana-monkey-business', // SMB
    'mad-lads',             // MAD
    'okay-bears',           // OKAY
    'famous-fox-federation' // FOX
  ],

  // Gaming & NFTs
  gaming: [
    'star-atlas',
    'aurory',
    'defi-land',
    'genopets',
    'stepn',
    'monkey-league'
  ],

  // Emerging Projects
  emerging: [
    'tensor',
    'parcl-protocol',
    'backpack-exchange',
    'sanctum',
    'sharky-fi',
    'zeta-markets'
  ]
} as const;

// Price impact thresholds for meme coins
export const LIQUIDITY_THRESHOLDS = {
  HIGH: 1000000,    // $1M+ liquidity
  MEDIUM: 250000,   // $250K+ liquidity
  LOW: 50000        // $50K+ liquidity
} as const;