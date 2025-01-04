import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export interface Node extends SimulationNodeDatum {
  id: string;
  group: string;
  value: number;
  marketCap: number;
  volume24h: number;
  dominance: number;
  change24h: number;
  holders: number;
}

export interface Link extends SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
  correlation: number;
  volumeShare: number;
}

export interface TokenDetails extends Node {
  connections: number;
  correlations: Array<{
    token: string;
    value: number;
  }>;
  volumeMetrics: {
    marketShare: number;
    turnover: number;
  };
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export interface MarketMetrics {
  totalMarketCap: number;
  total24hVolume: number;
  btcDominance: number;
  activeMarkets: number;
  defiTVL: number;
}