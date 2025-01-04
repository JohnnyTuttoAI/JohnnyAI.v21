import { useState, useEffect } from 'react';
import { sentimentAnalyzer } from '../services/analysis/sentimentAnalyzer';

export function useSocialSentiment() {
  const [sentiment, setSentiment] = useState({
    score: 0,
    fearGreedIndex: 0,
    socialVolume: 0,
    signals: [] as string[],
    riskLevel: 'low' as 'low' | 'medium' | 'high'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSentiment() {
      try {
        // Mock data - replace with real API calls
        const metrics = {
          marketSentiment: 0.7,
          socialSentiment: 0.65,
          fundingRates: {
            current: 0.01,
            trend: 'stable' as const,
            extremes: false
          },
          leverage: {
            longRatio: 0.6,
            shortRatio: 0.4,
            aggregateLeverage: 2.5,
            liquidationLevels: [40000, 38000, 35000]
          },
          fearGreedIndex: 65
        };

        const analysis = sentimentAnalyzer.analyzeSentiment(metrics);
        
        setSentiment({
          score: analysis.score,
          fearGreedIndex: metrics.fearGreedIndex,
          socialVolume: 15234,
          signals: analysis.signals,
          riskLevel: analysis.riskLevel
        });
      } catch (error) {
        console.error('Error fetching sentiment:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSentiment();
    const interval = setInterval(fetchSentiment, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return { sentiment, isLoading };
}