// Add to existing ecosystems
export const FLARE_ECOSYSTEM = {
  layer1: [
    'flare-networks',
    'songbird',
    'flare-finance',
    'gfla-finance',
    'sparkles',
    'agencyfi'
  ],
  
  fassets: [
    'fbtc',
    'fxrp',
    'fdoge',
    'fltc',
    'fada'
  ],
  
  infrastructure: [
    'state-connector',
    'ftso',
    'layercake',
    'fassets'
  ]
} as const;

export function analyzeFlareEcosystem(allCoins: MarketData[]): EcosystemMetrics {
  const flareCoins = allCoins.filter(coin => 
    FLARE_ECOSYSTEM.layer1.includes(coin.id) ||
    FLARE_ECOSYSTEM.fassets.includes(coin.id)
  );

  const metrics = calculateEcosystemMetrics(flareCoins);
  return {
    name: 'Flare Network',
    ...metrics,
    topProjects: flareCoins.slice(0, 10)
  };
}