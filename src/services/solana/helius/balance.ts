import { PublicKey } from '@solana/web3.js';
import { heliusClient } from './client';

export async function getTokenBalances(walletAddress: string) {
  try {
    const connection = heliusClient.getConnection();
    const pubkey = new PublicKey(walletAddress);

    const balance = await connection.getBalance(pubkey);
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubkey, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
    });

    return {
      sol: balance / 1e9,
      tokens: tokenAccounts.value.map(account => ({
        mint: account.account.data.parsed.info.mint,
        amount: account.account.data.parsed.info.tokenAmount.uiAmount,
        decimals: account.account.data.parsed.info.tokenAmount.decimals
      }))
    };
  } catch (error) {
    console.error('Error fetching token balances:', error);
    throw error;
  }
}