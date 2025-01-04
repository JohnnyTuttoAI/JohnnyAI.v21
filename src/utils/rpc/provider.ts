```typescript
import { providers } from 'ethers';
import { flareRPCLoadBalancer } from './loadBalancer';
import { FLARE_RPCS } from '../../config/networks/flare/rpcs';

class FlareProvider {
  private provider: providers.JsonRpcProvider;
  private wsProvider: providers.WebSocketProvider | null = null;

  constructor() {
    const rpcUrl = flareRPCLoadBalancer.getNextEndpoint();
    this.provider = new providers.JsonRpcProvider(rpcUrl);
    this.initializeWebSocket();
  }

  private initializeWebSocket() {
    try {
      this.wsProvider = new providers.WebSocketProvider(FLARE_RPCS.websocket[0]);
      
      this.wsProvider.on('error', () => {
        this.reconnectWebSocket();
      });
    } catch (error) {
      console.error('WebSocket connection failed:', error);
    }
  }

  private async reconnectWebSocket() {
    if (this.wsProvider) {
      try {
        await this.wsProvider.destroy();
      } catch {}
    }
    this.initializeWebSocket();
  }

  public getProvider(): providers.JsonRpcProvider {
    return this.provider;
  }

  public getWebSocketProvider(): providers.WebSocketProvider | null {
    return this.wsProvider;
  }

  public async switchProvider() {
    const newRpcUrl = flareRPCLoadBalancer.getNextEndpoint();
    this.provider = new providers.JsonRpcProvider(newRpcUrl);
  }
}

export const flareProvider = new FlareProvider();