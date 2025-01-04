import { Memory } from './types';

export class MemoryAnalyzer {
  static extractTopics(text: string): string[] {
    const cryptoTerms = [
      'bitcoin', 'ethereum', 'defi', 'nft', 'trading',
      'market', 'blockchain', 'altcoin', 'mining', 'wallet'
    ];
    return cryptoTerms.filter(term => 
      text.toLowerCase().includes(term)
    );
  }

  static analyzeSentiment(text: string): number {
    const positiveTerms = ['bullish', 'moon', 'pump', 'green', 'profit', 'based'];
    const negativeTerms = ['bearish', 'dump', 'red', 'loss', 'rekt'];
    
    let sentiment = 0;
    const words = text.toLowerCase().split(' ');
    
    words.forEach(word => {
      if (positiveTerms.includes(word)) sentiment += 0.2;
      if (negativeTerms.includes(word)) sentiment -= 0.2;
    });
    
    return Math.max(-1, Math.min(1, sentiment));
  }
}