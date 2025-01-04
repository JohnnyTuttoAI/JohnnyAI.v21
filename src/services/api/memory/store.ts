import { Memory, MemoryStats } from './types';

export class MemoryStore {
  private memories: Memory[] = [];
  private readonly MAX_MEMORIES = 100;

  addMemory(memory: Memory): void {
    this.memories.unshift(memory);
    if (this.memories.length > this.MAX_MEMORIES) {
      this.memories.pop();
    }
  }

  getRelevantMemories(context: string, limit: number = 3): Memory[] {
    return this.memories
      .filter(memory => this.calculateRelevance(memory, context) > 0.5)
      .slice(0, limit);
  }

  private calculateRelevance(memory: Memory, context: string): number {
    const contextWords = context.toLowerCase().split(' ');
    const memoryWords = memory.context.toLowerCase().split(' ');
    const commonWords = contextWords.filter(word => memoryWords.includes(word));
    return commonWords.length / Math.max(contextWords.length, memoryWords.length);
  }

  getStats(): MemoryStats {
    const stats: MemoryStats = {
      totalInteractions: this.memories.length,
      topTopics: this.getTopTopics(),
      averageSentiment: this.calculateAverageSentiment(),
      lastInteraction: this.memories[0]?.timestamp || Date.now()
    };
    return stats;
  }

  private getTopTopics(): string[] {
    const topicCount = new Map<string, number>();
    this.memories.forEach(memory => {
      memory.topics.forEach(topic => {
        topicCount.set(topic, (topicCount.get(topic) || 0) + 1);
      });
    });
    return Array.from(topicCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([topic]) => topic);
  }

  private calculateAverageSentiment(): number {
    if (this.memories.length === 0) return 0;
    const sum = this.memories.reduce((acc, memory) => acc + memory.sentiment, 0);
    return sum / this.memories.length;
  }
}