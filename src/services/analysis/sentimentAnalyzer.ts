export class SentimentAnalyzer {
  private readonly weights = {
    marketSentiment: 0.3,
    socialSentiment: 0.2,
    funding: 0.2,
    leverage: 0.2,
    fearGreed: 0.1
  };

  analyzeSentiment(metrics: {
    marketSentiment: number;
    socialSentiment: number;
    fundingRates: {
      current: number;
      trend: 'increasing' | 'decreasing' | 'stable';
      extremes: boolean;
    };
    leverage: {
      longRatio: number;
      shortRatio: number;
      aggregateLeverage: number;
      liquidationLevels: number[];
    };
    fearGreedIndex: number;
  }): {
    score: number;
    signals: string[];
    riskLevel: 'low' | 'medium' | 'high';
  } {
    const score = this.calculateScore(metrics);
    const signals = this.interpretSignals(metrics);
    const riskLevel = this.assessRisk(metrics);

    return { score, signals, riskLevel };
  }

  private calculateScore(metrics: any): number {
    return (
      metrics.marketSentiment * this.weights.marketSentiment +
      metrics.socialSentiment * this.weights.socialSentiment +
      this.normalizeFunding(metrics.fundingRates) * this.weights.funding +
      this.normalizeLeverage(metrics.leverage) * this.weights.leverage +
      (metrics.fearGreedIndex / 100) * this.weights.fearGreed
    );
  }

  private normalizeFunding(funding: any): number {
    const baseScore = Math.min(Math.abs(funding.current), 1);
    const trendMultiplier = funding.trend === 'increasing' ? 1.2 : 
                           funding.trend === 'decreasing' ? 0.8 : 1;
    return baseScore * trendMultiplier;
  }

  private normalizeLeverage(leverage: any): number {
    return Math.min(leverage.aggregateLeverage / 10, 1);
  }

  private interpretSignals(metrics: any): string[] {
    const signals: string[] = [];
    
    if (metrics.fundingRates.extremes) {
      signals.push('Extreme funding rates - potential reversal');
    }
    
    if (metrics.leverage.aggregateLeverage > 5) {
      signals.push('High leverage - increased volatility risk');
    }
    
    if (metrics.fearGreedIndex < 20) {
      signals.push('Extreme fear - potential accumulation zone');
    } else if (metrics.fearGreedIndex > 80) {
      signals.push('Extreme greed - potential distribution zone');
    }
    
    if (metrics.leverage.longRatio > 0.7) {
      signals.push('Heavy long bias - potential squeeze risk');
    } else if (metrics.leverage.shortRatio > 0.7) {
      signals.push('Heavy short bias - potential squeeze risk');
    }
    
    return signals;
  }

  private assessRisk(metrics: any): 'low' | 'medium' | 'high' {
    const riskFactors = [
      metrics.leverage.aggregateLeverage > 5,
      Math.abs(metrics.fundingRates.current) > 0.1,
      metrics.fearGreedIndex < 20 || metrics.fearGreedIndex > 80,
      Math.abs(metrics.leverage.longRatio - 0.5) > 0.2
    ];

    const riskCount = riskFactors.filter(Boolean).length;
    
    if (riskCount >= 3) return 'high';
    if (riskCount >= 1) return 'medium';
    return 'low';
  }
}

export const sentimentAnalyzer = new SentimentAnalyzer();