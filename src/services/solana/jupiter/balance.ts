import { Connection, PublicKey } from '@solana/web3.js';
import { JUPITER_CONFIG } from './config';
import { JupiterError, ERROR_CODES } from './api/errors';

class TokenBalanceService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection('https://api.mainnet-beta.solana.com');
  }

  async getBalance(walletAddress: string, mintAddress: string): Promise<number> {
    try {
      const wallet = new PublicKey(walletAddress);

      // Handle SOL balance
      if (mintAddress === JUPITER_CONFIG.commonTokens.SOL) {
        const balance = await this.connection.getBalance(wallet);
        return balance / 1e9; // Convert lamports to SOL
      }

      // Handle SPL token balance
      const mint = new PublicKey(mintAddress);
      const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(wallet, {
        mint
      });

      let balance = 0;
      for (const { account } of tokenAccounts.value) {
        const parsedData = account.data.parsed;
        if (parsedData.info.tokenAmount) {
          balance += Number(parsedData.info.tokenAmount.uiAmount || 0);
        }
      }

      return balance;
    } catch (error) {
      console.error('Balance fetch error:', error);
      throw new JupiterError(
        'Failed to fetch token balance',
        undefined,
        ERROR_CODES.BALANCE_ERROR
      );
    }
  }
}

export const tokenBalanceService = new TokenBalanceService();