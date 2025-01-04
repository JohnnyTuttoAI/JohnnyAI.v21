import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { heliusClient } from '../helius/client';
import { jupiterApiClient } from './api/client';
import type { QuoteResponse } from './types';

export async function executeSwapWithHelius(
  quoteResponse: QuoteResponse,
  walletPublicKey: string
) {
  try {
    const connection = heliusClient.getConnection();
    
    // Get latest blockhash
    const { blockhash, lastValidBlockHeight } = 
      await connection.getLatestBlockhash('finalized');

    // Create transaction
    const transaction = Transaction.from(
      Buffer.from(quoteResponse.swapTransaction, 'base64')
    );

    // Update transaction
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = new PublicKey(walletPublicKey);

    return {
      transaction,
      latestBlockhash: {
        blockhash,
        lastValidBlockHeight
      }
    };
  } catch (error) {
    console.error('Error preparing Helius swap:', error);
    throw error;
  }
}