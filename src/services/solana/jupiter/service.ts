import { jupiterApiClient } from './api/client';
import { tokenBalanceService } from './balance';
import { JUPITER_CONFIG } from './config';
import { JupiterError, ERROR_CODES } from './api/errors';
import type { QuoteResponse, SwapResult } from './types';

class JupiterService {
  async getQuote(
    outputMint: string,
    amount: number,
    slippageBps: number
  ): Promise<QuoteResponse> {
    try {
      return await jupiterApiClient.getQuote({
        inputMint: JUPITER_CONFIG.commonTokens.SOL,
        outputMint,
        amount: Math.floor(amount * 1e9), // Convert SOL to lamports
        slippageBps
      });
    } catch (error) {
      console.error('Quote error:', error);
      throw new JupiterError(
        'Failed to get quote',
        undefined,
        ERROR_CODES.QUOTE_FAILED
      );
    }
  }

  async executeSwap(
    quoteResponse: QuoteResponse,
    userPublicKey: string
  ): Promise<SwapResult> {
    try {
      return await jupiterApiClient.executeSwap({
        quoteResponse,
        userPublicKey,
        wrapUnwrapSOL: true
      });
    } catch (error) {
      console.error('Swap error:', error);
      throw new JupiterError(
        'Failed to execute swap',
        undefined,
        ERROR_CODES.SWAP_FAILED
      );
    }
  }

  async getTokenBalance(
    walletAddress: string,
    mintAddress: string
  ): Promise<number> {
    try {
      return await tokenBalanceService.getBalance(walletAddress, mintAddress);
    } catch (error) {
      console.error('Balance fetch error:', error);
      // Return 0 instead of throwing to prevent UI disruption
      return 0;
    }
  }
}

export const jupiterService = new JupiterService();