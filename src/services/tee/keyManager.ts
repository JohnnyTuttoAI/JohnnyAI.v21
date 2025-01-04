export class KeyManager {
  private readonly keys: Map<string, CryptoKeyPair> = new Map();

  async generateKeyPair(): Promise<string> {
    const keyId = `key-${Date.now()}`;
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: 'ECDSA',
        namedCurve: 'P-256'
      },
      true,
      ['sign', 'verify']
    );
    
    this.keys.set(keyId, keyPair);
    return keyId;
  }

  async sign(keyId: string, data: string): Promise<string> {
    const keyPair = this.keys.get(keyId);
    if (!keyPair) throw new Error('Key not found');

    const signature = await window.crypto.subtle.sign(
      {
        name: 'ECDSA',
        hash: { name: 'SHA-256' },
      },
      keyPair.privateKey,
      new TextEncoder().encode(data)
    );

    return Buffer.from(signature).toString('base64');
  }

  async verify(keyId: string, signature: string, data: string): Promise<boolean> {
    const keyPair = this.keys.get(keyId);
    if (!keyPair) throw new Error('Key not found');

    return window.crypto.subtle.verify(
      {
        name: 'ECDSA',
        hash: { name: 'SHA-256' },
      },
      keyPair.publicKey,
      Buffer.from(signature, 'base64'),
      new TextEncoder().encode(data)
    );
  }
}