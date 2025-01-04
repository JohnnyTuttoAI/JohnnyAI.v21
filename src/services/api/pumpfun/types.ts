export interface QuoteRequest {
  quote_type: 'buy' | 'sell';
  mint: string;
  amount: number;
  slippage?: number;
}

export interface QuoteResponse {
  quote_type: 'buy' | 'sell';
  inputMint: string;
  inAmount: number;
  outputMint: string;
  outAmount: number;
}

export interface PumpScanResult {
  address: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  holders: number;
  score: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
}