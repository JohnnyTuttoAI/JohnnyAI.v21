import { DexPair, PairAnalysis } from './types';
import { API_CONFIG } from './constants';
import { DexScreenerError, ERROR_CODES } from './errors';
import { analyzePairMetrics } from './metrics';
import { handleResponse } from '../base';

class DexScreenerService {
  private lastRequestTime: number = 0;

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < API_CONFIG.rateLimit) {
      await new Promise(resolve => 
        setTimeout(resolve, API_CONFIG.rateLimit - timeSinceLastRequest)
      );
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

      const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      this.lastRequestTime = Date.now();

      if (!response.ok) {
        if (response.status === 429) {
          throw new DexScreenerError(
            'Rate limit exceeded',
            ERROR_CODES.RATE_LIMIT,
            response.status
          );
        }
        throw new DexScreenerError(
          'API request failed',
          ERROR_CODES.NETWORK_ERROR,
          response.status
        );
      }

      return handleResponse<T>(response);
    } catch (error) {
      if (error instanceof DexScreenerError) throw error;
      
      if (error.name === 'AbortError') {
        throw new DexScreenerError(
          'Request timeout',
          ERROR_CODES.TIMEOUT
        );
      }

      throw new DexScreenerError(
        'Network error',
        ERROR_CODES.NETWORK_ERROR,
        undefined,
        error
      );
    }
  }

  async searchPairs(query: string): Promise<DexPair[]> {
    const data = await this.makeRequest<{ pairs: DexPair[] }>(
      `/dex/search/?q=${encodeURIComponent(query)}`
    );
    return data.pairs;
  }

  async getPairsByAddress(address: string): Promise<DexPair[]> {
    const data = await this.makeRequest<{ pairs: DexPair[] }>(
      `/dex/pairs/${address}`
    );
    return data.pairs;
  }

  async getTopPairsByChain(chainId: string): Promise<DexPair[]> {
    const data = await this.makeRequest<{ pairs: DexPair[] }>(
      `/dex/pairs/${chainId}`
    );
    return data.pairs;
  }

  async analyzePair(pair: DexPair): Promise<PairAnalysis> {
    const metrics = analyzePairMetrics(pair);
    const buyPressure = pair.txns.h24.buys / (pair.txns.h24.buys + pair.txns.h24.sells);
    
    return {
      buyPressure,
      volumeToLiquidity: pair.volume.h24 / (pair.liquidity?.usd || 1),
      isHighActivity: metrics.volumeScore > 0.8,
      hasStrongLiquidity: metrics.liquidityScore > 0.8,
      recentPriceAction: {
        shortTerm: pair.priceChange.m5,
        mediumTerm: pair.priceChange.h1,
        longTerm: pair.priceChange.h24
      },
      riskLevel: metrics.totalScore >= 0.8 ? 'LOW' :
                 metrics.totalScore >= 0.5 ? 'MEDIUM' : 'HIGH',
      healthScore: metrics.totalScore
    };
  }
}

export const dexScreenerService = new DexScreenerService();