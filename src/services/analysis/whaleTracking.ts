interface WhaleActivity {
  address: string;
  type: 'accumulation' | 'distribution';
  volume: number;
  timestamp: number;
  chain: string;
  token: string;
  priceImpact: number;
}

interface WhaleMetrics {
  netFlow: number;
  dominance: number;
  activity: WhaleActivity[];
  clusters: WhaleCluster[];
}

interface WhaleCluster {
  addresses: string[];
  totalVolume: number;
  averagePosition: number;
  behavior: 'accumulating' | 'distributing' | 'neutral';
}

export class WhaleTracker {
  private readonly WHALE_THRESHOLD = 1000000; // $1M USD
  private readonly activities: WhaleActivity[] = [];
  private readonly clusters: Map<string, WhaleCluster> = new Map();

  trackActivity(activity: WhaleActivity): void {
    if (activity.volume >= this.WHALE_THRESHOLD) {
      this.activities.push(activity);
      this.updateClusters(activity);
    }
  }

  getMetrics(timeWindow: number = 24 * 60 * 60 * 1000): WhaleMetrics {
    const recentActivities = this.getRecentActivity(timeWindow);
    
    return {
      netFlow: this.calculateNetFlow(recentActivities),
      dominance: this.calculateDominance(recentActivities),
      activity: recentActivities,
      clusters: Array.from(this.clusters.values())
    };
  }

  private getRecentActivity(timeWindow: number): WhaleActivity[] {
    const cutoff = Date.now() - timeWindow;
    return this.activities.filter(activity => activity.timestamp >= cutoff);
  }

  private calculateNetFlow(activities: WhaleActivity[]): number {
    return activities.reduce((flow, activity) => {
      return flow + (activity.type === 'accumulation' ? activity.volume : -activity.volume);
    }, 0);
  }

  private calculateDominance(activities: WhaleActivity[]): number {
    const totalVolume = activities.reduce((sum, a) => sum + a.volume, 0);
    const whaleVolume = activities
      .filter(a => a.volume >= this.WHALE_THRESHOLD)
      .reduce((sum, a) => sum + a.volume, 0);
    
    return whaleVolume / totalVolume;
  }

  private updateClusters(activity: WhaleActivity): void {
    // Cluster analysis implementation
    const clusterId = this.findCluster(activity.address);
    
    if (clusterId) {
      const cluster = this.clusters.get(clusterId)!;
      cluster.totalVolume += activity.volume;
      cluster.behavior = this.determineBehavior(cluster);
    } else {
      this.createNewCluster(activity);
    }
  }

  private findCluster(address: string): string | null {
    // Implementation to find related addresses
    return null;
  }

  private createNewCluster(activity: WhaleActivity): void {
    const clusterId = `cluster-${Date.now()}`;
    this.clusters.set(clusterId, {
      addresses: [activity.address],
      totalVolume: activity.volume,
      averagePosition: activity.volume,
      behavior: activity.type === 'accumulation' ? 'accumulating' : 'distributing'
    });
  }

  private determineBehavior(cluster: WhaleCluster): 'accumulating' | 'distributing' | 'neutral' {
    // Implementation to determine cluster behavior
    return 'neutral';
  }
}