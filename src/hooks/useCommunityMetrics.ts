import { useState, useEffect } from 'react';

interface CommunityMetrics {
  totalMembers: number;
  activeUsers: number;
  engagement: {
    'Messages/Day': number;
    'Reactions/Message': number;
    'New Members': number;
    'Retention Rate': string;
  };
}

export function useCommunityMetrics() {
  const [metrics, setMetrics] = useState<CommunityMetrics>({
    totalMembers: 0,
    activeUsers: 0,
    engagement: {
      'Messages/Day': 0,
      'Reactions/Message': 0,
      'New Members': 0,
      'Retention Rate': '0%'
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with real API call
    const mockMetrics: CommunityMetrics = {
      totalMembers: 25432,
      activeUsers: 8234,
      engagement: {
        'Messages/Day': 1234,
        'Reactions/Message': 4.2,
        'New Members': 156,
        'Retention Rate': '78%'
      }
    };

    setMetrics(mockMetrics);
    setIsLoading(false);
  }, []);

  return { metrics, isLoading };
}