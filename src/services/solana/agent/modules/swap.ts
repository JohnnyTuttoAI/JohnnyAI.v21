import { PublicKey } from '@solana/web3.js';
import type { SwapResult } from '../types';
import { AGENT_CONFIG } from '../config';

export async function swapTokens(
  agent: any,
  targetMint: string,
  amount: number,
  sourceMint: string,
  slippage: number = AGENT_CONFIG.defaultSlippage
): Promise<SwapResult> {
  try {
    const signature = await agent.trade(
      new PublicKey(targetMint),
      amount,
      new PublicKey(sourceMint),
      slippage
    );

    return {
      signature,
      price: 0, // Would come from actual swap
      priceImpact: 0 // Would come from actual swap
    };
  } catch (error) {
    console.error('Token swap error:', error);
    throw error;
  }
}