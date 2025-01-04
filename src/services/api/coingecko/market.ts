import { config } from '../../../config/env';
import { handleResponse } from '../base';

interface GlobalData {
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  market_cap_percentage: Record<string, number>;
  market_cap_change_percentage_24h_usd: number;
}

export async function getGlobalData(): Promise<GlobalData> {
  const url = `${config.coingecko.baseUrl}/global`;
  const response = await fetch(url, {
    headers: { 'x-cg-pro-api-key': config.coingecko.apiKey }
  });
  const data = await handleResponse<{ data: GlobalData }>(response);
  return data.data;
}