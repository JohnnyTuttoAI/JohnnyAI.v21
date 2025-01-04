import { PublicKey } from '@solana/web3.js';

export interface TokenDeployResult {
  mint: PublicKey;
  signature: string;
}

export interface SwapResult {
  signature: string;
  price: number;
  priceImpact: number;
}

export interface AgentState {
  isInitialized: boolean;
  wallet?: PublicKey;
  lastAction?: string;
  timestamp?: number;
}