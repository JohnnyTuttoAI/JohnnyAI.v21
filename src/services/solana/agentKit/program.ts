import { Connection, PublicKey } from '@solana/web3.js';
import type { AgentState } from './types';

export class AgentProgram {
  constructor(
    private connection: Connection,
    private programId: string
  ) {}

  async getAgentState(): Promise<AgentState> {
    // Mock implementation - replace with actual on-chain data fetching
    return {
      level: 1,
      experience: 0,
      lastInteraction: Date.now()
    };
  }
}