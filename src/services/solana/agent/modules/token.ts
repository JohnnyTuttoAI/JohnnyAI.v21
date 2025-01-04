import { PublicKey } from '@solana/web3.js';
import type { TokenDeployResult } from '../types';
import { AGENT_CONFIG } from '../config';

export async function deployToken(
  agent: any,
  name: string,
  symbol: string,
  decimals: number = 9,
  initialSupply: number = 1000000
): Promise<TokenDeployResult> {
  const uri = `https://arweave.net/metadata/${Date.now()}`; // Mock URI
  
  try {
    const result = await agent.deployToken(
      name,
      uri,
      symbol,
      decimals,
      initialSupply
    );

    return {
      mint: result.mint,
      signature: result.signature
    };
  } catch (error) {
    console.error('Token deployment error:', error);
    throw error;
  }
}