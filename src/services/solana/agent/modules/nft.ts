import { PublicKey } from '@solana/web3.js';
import type { NFTCollectionResult } from '../types';

export async function deployCollection(
  agent: any,
  params: {
    name: string;
    uri: string;
    royaltyBasisPoints: number;
    creators: Array<{
      address: string;
      percentage: number;
    }>;
  }
): Promise<NFTCollectionResult> {
  try {
    const result = await agent.deployCollection(params);
    return {
      collectionMint: result.collectionMint,
      signature: result.signature
    };
  } catch (error) {
    console.error('NFT collection deployment error:', error);
    throw error;
  }
}