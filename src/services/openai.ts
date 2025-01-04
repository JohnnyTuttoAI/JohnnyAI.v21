import OpenAI from 'openai';
import { config } from '../config/env';
import { AI_IDENTITY } from '../config/constants';
import { getCryptoPrice } from './coingecko';

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are ${AI_IDENTITY.name}, a crypto intelligence agent. Your expertise includes:
- Real-time cryptocurrency market data
- Advanced market analysis and trends
- Trading strategies and risk management
- Blockchain technology and DeFi protocols
Always maintain a confident yet approachable tone, and prioritize accurate, data-driven insights.`;

export async function getChatCompletion(message: string): Promise<string> {
  try {
    const cryptoMatch = message.match(/price of (\w+)/i);
    if (cryptoMatch) {
      const coinId = cryptoMatch[1].toLowerCase();
      const priceData = await getCryptoPrice(coinId);
      
      if (priceData) {
        const price = priceData.current_price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        });
        const change = priceData.price_change_percentage_24h.toFixed(2);
        const direction = parseFloat(change) >= 0 ? 'up' : 'down';
        
        return `Based on my latest data, ${coinId} is trading at ${price} USD, ${direction} ${Math.abs(parseFloat(change))}% in the last 24 hours. Let me know if you need any market analysis on this.`;
      }
      
      return `I couldn't find the price data for ${coinId}. Please make sure you're using the correct cryptocurrency ID (e.g., 'bitcoin', 'ethereum').`;
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0]?.message?.content || "I need more context to provide accurate information. Could you clarify?";
  } catch (error) {
    console.error('Error getting chat completion:', error);
    throw new Error('Failed to get response from AI');
  }
}