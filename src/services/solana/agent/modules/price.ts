export async function getPythPrice(
  agent: any,
  priceAccount: string
): Promise<number> {
  try {
    return await agent.pythFetchPrice(priceAccount);
  } catch (error) {
    console.error('Price fetch error:', error);
    throw error;
  }
}