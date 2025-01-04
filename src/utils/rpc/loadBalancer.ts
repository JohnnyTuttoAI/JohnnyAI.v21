```typescript
import { FLARE_RPCS } from '../../config/networks/flare/rpcs';

class RPCLoadBalancer {
  private endpoints: string[];
  private currentIndex: number = 0;
  private healthChecks: Map<string, boolean> = new Map();

  constructor(endpoints: string[]) {
    this.endpoints = endpoints;
    this.initializeHealthChecks();
  }

  private async initializeHealthChecks() {
    await Promise.all(
      this.endpoints.map(endpoint => this.checkEndpointHealth(endpoint))
    );
  }

  private async checkEndpointHealth(endpoint: string): Promise<boolean> {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1
        })
      });
      
      const isHealthy = response.ok;
      this.healthChecks.set(endpoint, isHealthy);
      return isHealthy;
    } catch {
      this.healthChecks.set(endpoint, false);
      return false;
    }
  }

  public getNextEndpoint(): string {
    const healthyEndpoints = this.endpoints.filter(endpoint => 
      this.healthChecks.get(endpoint)
    );

    if (healthyEndpoints.length === 0) {
      throw new Error('No healthy RPC endpoints available');
    }

    this.currentIndex = (this.currentIndex + 1) % healthyEndpoints.length;
    return healthyEndpoints[this.currentIndex];
  }

  public async refreshHealthChecks() {
    await this.initializeHealthChecks();
  }
}

export const flareRPCLoadBalancer = new RPCLoadBalancer(FLARE_RPCS.primary);