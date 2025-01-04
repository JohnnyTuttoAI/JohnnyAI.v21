import { useState, useEffect } from 'react';

interface TrendingTopic {
  name: string;
  mentions: number;
  sentiment: number;
}

export function useTrendingTopics() {
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with real API call
    const mockTopics: TrendingTopic[] = [
      { name: 'Bitcoin', mentions: 12543, sentiment: 8.5 },
      { name: 'Solana', mentions: 8234, sentiment: 12.3 },
      { name: 'Layer2', mentions: 6123, sentiment: -2.1 },
      { name: 'DeFi', mentions: 4532, sentiment: 5.4 },
      { name: 'NFTs', mentions: 3421, sentiment: -4.2 }
    ];

    setTopics(mockTopics);
    setIsLoading(false);
  }, []);

  return { topics, isLoading };
}