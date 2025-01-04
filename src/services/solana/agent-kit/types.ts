import { PublicKey } from '@solana/web3.js';

export interface AgentConfig {
  rpcUrl: string;
  openAiKey: string;
  defaultSlippage: number;
}

export interface TokenDeployResult {
  mint: PublicKey;
  signature: string;
}

export interface SwapResult {
  signature: string;
  price: number;
  priceImpact: number;
}

export interface NFTCollectionResult {
  collectionMint: PublicKey;
  signature: string;
}