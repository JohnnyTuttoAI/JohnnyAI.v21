import { OpenAI } from 'openai';
import { config } from '../../../config/env';
import type { CompanyInsights } from '../../../types';

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
  dangerouslyAllowBrowser: true
});

export async function analyzeCompanyData(insights: CompanyInsights) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a corporate financial analyst specializing in market analysis and risk assessment."
        },
        {
          role: "user",
          content: `Analyze this company data and provide insights:
            Financial Metrics: ${JSON.stringify(insights.financials)}
            Market Data: ${JSON.stringify(insights.market)}
            ESG Score: ${JSON.stringify(insights.esg)}
            Insider Sentiment: ${JSON.stringify(insights.sentiment)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0]?.message?.content || 'No analysis available';
  } catch (error) {
    console.error('OpenAI analysis error:', error);
    throw error;
  }
}