import { PublicKey } from '@solana/web3.js';

export function getAirdropCostEstimate(
  recipientCount: number,
  priorityFee: number = 30_000
): number {
  return recipientCount * priorityFee;
}

export async function sendCompressedAirdrop(
  agent: any,
  mint: string,
  amount: number,
  recipients: string[],
  priorityFee: number = 30_000
): Promise<string> {
  try {
    return await agent.sendCompressedAirdrop(
      new PublicKey(mint),
      amount,
      recipients.map(addr => new PublicKey(addr)),
      priorityFee
    );
  } catch (error) {
    console.error('Airdrop error:', error);
    throw error;
  }
}