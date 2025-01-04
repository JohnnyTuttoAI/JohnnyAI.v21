export interface Memory {
  id: string;
  context: string;
  response: string;
  timestamp: number;
  sentiment: number; // -1 to 1
  topics: string[];
}

export interface MemoryStats {
  totalInteractions: number;
  topTopics: string[];
  averageSentiment: number;
  lastInteraction: number;
}