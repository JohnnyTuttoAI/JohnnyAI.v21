import OpenAI from 'openai';
import { config } from '../../config/env';
import { coinGeckoService } from './coingecko';
import { dexScreenerService } from './dexscreener';
import { CHAIN_IDS } from './dexscreener/chains';
import { formatPriceResponse } from '../../utils/responses';
import { SYSTEM_PROMPT, ERROR_MESSAGES } from './prompts';

class OpenAIService {
  private client: OpenAI;

  constructor() {
    if (!config.openai.apiKey) {
      throw new Error('OpenAI API key is not configured');
    }
    
    this.client = new OpenAI({
      apiKey: config.openai.apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async getChatCompletion(message: string): Promise<string> {
    try {
      // Check for DEX-related queries
      if (message.toLowerCase().includes('dex') || 
          message.toLowerCase().includes('liquidity') ||
          message.toLowerCase().includes('volume')) {
        return this.handleDexQuery(message);
      }

      // Check for price queries
      const cryptoMatch = message.match(/price (?:of |for )?(\w+)/i);
      if (cryptoMatch) {
        return this.handlePriceQuery(cryptoMatch[1]);
      }

      return this.getAIResponse(message);
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(ERROR_MESSAGES.API_ERROR);
    }
  }

  private async handleDexQuery(message: string): Promise<string> {
    try {
      // Extract token from message
      const tokenMatch = message.match(/(?:dex|pair|liquidity|volume).*?(\w+)/i);
      if (!tokenMatch) return ERROR_MESSAGES.INVALID_QUERY;

      const token = tokenMatch[1].toLowerCase();
      
      // Get DEX data from multiple chains
      const [solanaData, ethereumData] = await Promise.all([
        dexScreenerService.getTopPairsByChain(CHAIN_IDS.solana),
        dexScreenerService.getTopPairsByChain(CHAIN_IDS.ethereum)
      ]);

      // Find relevant pairs
      const relevantPairs = [...solanaData, ...ethereumData]
        .filter(pair => 
          pair.baseToken.symbol.toLowerCase() === token ||
          pair.baseToken.name.toLowerCase().includes(token)
        );

      if (relevantPairs.length === 0) {
        return `anon, no liquid pairs found for ${token}. Stick to blue chips or check your spelling 🔍`;
      }

      // Analyze top pair
      const topPair = relevantPairs[0];
      const analysis = await dexScreenerService.analyzePairMetrics(topPair);

      const buyPressureText = analysis.buyPressure > 0.6 ? 'Heavy buying' :
                             analysis.buyPressure < 0.4 ? 'Heavy selling' :
                             'Neutral flow';

      return `${token.toUpperCase()} DEX Analysis 📊

Price: $${parseFloat(topPair.priceUsd).toFixed(6)}
24h Vol: $${(topPair.volume.h24/1000000).toFixed(2)}M
Liquidity: $${(topPair.liquidity?.usd || 0/1000000).toFixed(2)}M

${buyPressureText} (${(analysis.buyPressure * 100).toFixed(0)}% buys)
${analysis.isHighActivity ? '🔥 High activity' : '📊 Normal activity'}
${analysis.hasStrongLiquidity ? '💪 Strong liquidity' : '⚠️ Low liquidity'}`;
    } catch (error) {
      console.error('DEX Query Error:', error);
      return ERROR_MESSAGES.API_ERROR;
    }
  }

  private async handlePriceQuery(coinInput: string): Promise<string> {
    const coinId = coinGeckoService.normalizeCoinId(coinInput);
    const [priceData, dexData] = await Promise.all([
      coinGeckoService.getCryptoPrice(coinId),
      dexScreenerService.searchPairs(coinId)
    ]);
    
    if (!priceData) {
      return ERROR_MESSAGES.INVALID_COIN;
    }

    let response = formatPriceResponse(coinId, priceData);

    // Add DEX data if available
    if (dexData.length > 0) {
      const topPair = dexData[0];
      response += `\n\nDEX Data 📊\nTop Pool: ${topPair.dexId}\nLiquidity: $${(topPair.liquidity?.usd || 0/1000000).toFixed(2)}M`;
    }
    
    return response;
  }

  private async getAIResponse(message: string): Promise<string> {
    const completion = await this.client.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      model: "gpt-4-turbo-preview",
      temperature: 0.8,
      max_tokens: 500,
      presence_penalty: 0.6,
      frequency_penalty: 0.3
    });

    return completion.choices[0]?.message?.content || ERROR_MESSAGES.GENERAL_ERROR;
  }
}

export const openAIService = new OpenAIService();