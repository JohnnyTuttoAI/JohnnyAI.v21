import { SolanaAgentKit } from 'solana-agent-kit';
import { config } from '../../config/env';
import { Connection } from '@solana/web3.js';

class SolanaAgent {
  private agent: SolanaAgentKit | null = null;
  private connection: Connection;

  constructor() {
    this.connection = new Connection('https://api.mainnet-beta.solana.com');
  }

  async initialize(privateKey: string) {
    if (!this.agent) {
      this.agent = new SolanaAgentKit(
        privateKey,
        'https://api.mainnet-beta.solana.com',
        config.openai.apiKey
      );
    }
    return this.agent;
  }

  async deployToken(
    name: string,
    uri: string,
    symbol: string,
    decimals: number,
    initialSupply: number
  ) {
    if (!this.agent) throw new Error('Agent not initialized');
    
    try {
      const result = await this.agent.deployToken(
        name,
        uri,
        symbol,
        decimals,
        initialSupply
      );
      
      return {
        success: true,
        mintAddress: result.mint.toString(),
        signature: result.signature
      };
    } catch (error) {
      console.error('Token deployment error:', error);
      throw error;
    }
  }

  async getPythPrice(priceAccountKey: string) {
    if (!this.agent) throw new Error('Agent not initialized');
    
    try {
      const price = await this.agent.pythFetchPrice(priceAccountKey);
      return price;
    } catch (error) {
      console.error('Pyth price fetch error:', error);
      throw error;
    }
  }

  async swapTokens(
    targetMint: string,
    amount: number,
    sourceMint: string,
    slippage: number = 100 // 1%
  ) {
    if (!this.agent) throw new Error('Agent not initialized');
    
    try {
      const signature = await this.agent.trade(
        targetMint,
        amount,
        sourceMint,
        slippage
      );
      return signature;
    } catch (error) {
      console.error('Token swap error:', error);
      throw error;
    }
  }
}

export const solanaAgent = new SolanaAgent();