import OpenAI from 'openai';
import { config } from '../../config/env';
import { AI_IDENTITY } from '../../config/constants';
import { getCryptoPrice } from '../api/coingecko';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are ${AI_IDENTITY.name}, a crypto intelligence agent. Your expertise includes:
- Real-time cryptocurrency market data and price analysis
- Market trends and technical analysis
- Trading strategies and risk management
- Blockchain technology and DeFi protocols
Maintain a confident yet approachable tone, and always provide data-driven insights.`;

export async function getChatCompletion(message: string): Promise<string> {
  try {
    // Check for crypto price queries
    const cryptoMatch = message.match(/price (?:of |for )?(\w+)/i);
    if (cryptoMatch) {
      const coinId = cryptoMatch[1].toLowerCase();
      const priceData = await getCryptoPrice(coinId);
      
      if (priceData) {
        const price = formatCurrency(priceData.current_price);
        const change = formatPercentage(priceData.price_change_percentage_24h);
        
        return `Based on real-time data, ${coinId} is trading at ${price}, with a ${change} change in the last 24 hours. Would you like me to analyze this price movement or provide more market insights?`;
      }
      
      return `I couldn't find the price data for ${coinId}. Try using a common name like 'bitcoin' or 'ethereum', or let me know if you need help finding the correct coin identifier.`;
    }

    // Handle other queries with OpenAI
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0]?.message?.content || 
      "I need more context to provide accurate information. Could you please clarify your question?";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('I encountered an issue processing your request. Please try again with a different question.');
  }
}