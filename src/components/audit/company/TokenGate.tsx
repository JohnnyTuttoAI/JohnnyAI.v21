import React from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Icons } from '../../icons';
import LockLogo from '../../ui/LockLogo';

const JOHNNY_TOKEN_ADDRESS = '0x123...'; // Replace with actual token address
const REQUIRED_AMOUNT = 1_000_000n; // 1M $JOHNNY tokens required

export default function TokenGate({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
    token: JOHNNY_TOKEN_ADDRESS,
  });

  const hasAccess = balance?.value ? balance.value >= REQUIRED_AMOUNT : false;

  if (!isConnected) {
    return (
      <div className="text-center py-12 space-y-6">
        <LockLogo size="lg" className="mx-auto" />
        <div className="space-y-2">
          <h2 className="text-2xl font-swiss">Connect Wallet to Access</h2>
          <p className="text-gray-400 font-mono">Connect your wallet to verify $JOHNNY token holdings</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="text-center py-12 space-y-6">
        <LockLogo size="lg" className="mx-auto" />
        <div className="space-y-4">
          <h2 className="text-2xl font-swiss">Access Required</h2>
          <div className="space-y-2">
            <p className="text-gray-400 font-mono">Hold 1,000,000 $JOHNNY tokens to unlock:</p>
            <ul className="space-y-2 text-sm font-mono">
              <li className="flex items-center justify-center gap-2">
                <Icons.Check className="w-4 h-4 text-swiss-red" />
                <span>Advanced Corporate Analysis</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <Icons.Check className="w-4 h-4 text-swiss-red" />
                <span>AI-Powered Risk Assessment</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <Icons.Check className="w-4 h-4 text-swiss-red" />
                <span>Real-time Market Intelligence</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <Icons.Check className="w-4 h-4 text-swiss-red" />
                <span>ESG Score Analysis</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <Icons.Check className="w-4 h-4 text-swiss-red" />
                <span>Insider Trading Signals</span>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <a
              href="https://raydium.io/swap" // Replace with actual DEX link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyber-blue hover:text-cyber-purple transition-colors"
            >
              <span>Get $JOHNNY</span>
              <Icons.ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-xs text-gray-500">Current Balance: {balance ? (Number(balance.value) / 1e18).toLocaleString() : '0'} $JOHNNY</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}