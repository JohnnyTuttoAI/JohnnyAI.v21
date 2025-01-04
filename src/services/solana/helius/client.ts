import { Connection } from '@solana/web3.js';
import { HELIUS_CONFIG } from '../../../config/helius';

class HeliusClient {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(
      `${HELIUS_CONFIG.rpcUrl}/?api-key=${HELIUS_CONFIG.apiKey}`
    );
  }

  getConnection(): Connection {
    return this.connection;
  }
}

export const heliusClient = new HeliusClient();