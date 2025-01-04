import { JUPITER_CONFIG } from '../config';
import { QuoteRequest, QuoteResponse, SwapRequest, SwapResult } from '../types';
import { JupiterError, ERROR_CODES } from './errors';

class JupiterApiClient {
  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${JUPITER_CONFIG.apiUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers
        }
      });

      if (!response.ok) {
        throw new JupiterError(
          'Jupiter API request failed',
          response.status,
          ERROR_CODES.API_ERROR
        );
      }

      return response.json();
    } catch (error) {
      console.error('Jupiter API error:', error);
      throw new JupiterError('Failed to fetch from Jupiter API');
    }
  }

  async getQuote(params: QuoteRequest): Promise<QuoteResponse> {
    const searchParams = new URLSearchParams({
      inputMint: params.inputMint,
      outputMint: params.outputMint,
      amount: params.amount.toString(),
      slippageBps: params.slippageBps.toString(),
      onlyDirectRoutes: 'false',
      asLegacyTransaction: 'true'
    });

    return this.fetch<QuoteResponse>(`/quote?${searchParams}`);
  }

  async executeSwap(params: SwapRequest): Promise<SwapResult> {
    return this.fetch<SwapResult>('/swap', {
      method: 'POST',
      body: JSON.stringify({
        ...params,
        computeUnitPriceMicroLamports: JUPITER_CONFIG.priorityFee
      })
    });
  }
}

export const jupiterApiClient = new JupiterApiClient();