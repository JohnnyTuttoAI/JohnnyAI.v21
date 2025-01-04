export interface QuoteRequest {
  inputMint: string;
  outputMint: string;
  amount: number;
  slippageBps: number;
}

export interface QuoteResponse {
  inputMint: string;
  outputMint: string;
  inAmount: number;
  outAmount: number;
  otherAmountThreshold: number;
  swapMode: string;
  slippageBps: number;
  priceImpactPct: number;
  routePlan: Array<{
    swapInfo: {
      ammKey: string;
      label: string;
      inputMint: string;
      outputMint: string;
      inAmount: number;
      outAmount: number;
      feeAmount: number;
      feeMint: string;
    };
  }>;
}

export interface SwapRequest {
  quoteResponse: QuoteResponse;
  userPublicKey: string;
  wrapUnwrapSOL?: boolean;
}

export interface SwapResult {
  swapTransaction: string;
  signature?: string;
  error?: string;
}