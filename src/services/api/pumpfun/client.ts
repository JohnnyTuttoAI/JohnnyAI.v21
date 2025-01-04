import { PUMPFUN_CONFIG } from './config';
import { PumpFunError, ERROR_CODES } from './errors';
import type { QuoteRequest, QuoteResponse, PumpScanResult } from './types';

class PumpFunClient {
  private baseUrl: string;
  private lastRequestTime: number = 0;

  constructor() {
    this.baseUrl = PUMPFUN_CONFIG.baseUrl;
  }

  private async makeRequest<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    // Rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < PUMPFUN_CONFIG.rateLimit) {
      await new Promise(resolve => 
        setTimeout(resolve, PUMPFUN_CONFIG.rateLimit - timeSinceLastRequest)
      );
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers
        }
      });

      this.lastRequestTime = Date.now();

      if (!response.ok) {
        if (response.status === 429) {
          throw new PumpFunError(
            'Rate limit exceeded',
            ERROR_CODES.RATE_LIMIT,
            response.status
          );
        }
        throw new PumpFunError(
          'Request failed',
          ERROR_CODES.NETWORK_ERROR,
          response.status
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof PumpFunError) throw error;
      throw new PumpFunError(
        'Network error',
        ERROR_CODES.NETWORK_ERROR
      );
    }
  }

  async getQuote(params: QuoteRequest): Promise<QuoteResponse> {
    try {
      return await this.makeRequest<QuoteResponse>('/quote', {
        method: 'POST',
        body: JSON.stringify({
          ...params,
          slippage: params.slippage ?? PUMPFUN_CONFIG.defaultSlippage
        })
      });
    } catch (error) {
      console.error('Quote error:', error);
      throw new PumpFunError(
        'Failed to get quote',
        ERROR_CODES.QUOTE_ERROR
      );
    }
  }

  async searchTokens(query: string): Promise<PumpScanResult[]> {
    return this.makeRequest<PumpScanResult[]>('/search', {
      method: 'POST',
      body: JSON.stringify({ query })
    });
  }
}

export const pumpFunClient = new PumpFunClient();