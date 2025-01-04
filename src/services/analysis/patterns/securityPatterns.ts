export const SECURITY_PATTERNS = {
  reentrancy: {
    pattern: /(\.(call|transfer|send)\(.*\))(?!.*ReentrancyGuard)/i,
    severity: 'HIGH',
    title: 'Potential Reentrancy',
    description: 'Contract may be vulnerable to reentrancy attacks',
    recommendation: 'Implement ReentrancyGuard or checks-effects-interactions pattern'
  },
  accessControl: {
    pattern: /(onlyOwner|require\(msg\.sender).*\)/i,
    severity: 'MEDIUM',
    title: 'Access Control Check',
    description: 'Contract uses basic access control patterns',
    recommendation: 'Consider using OpenZeppelin AccessControl'
  },
  integerOverflow: {
    pattern: /([\+\-\*](?!SafeMath))/,
    severity: 'HIGH',
    title: 'Potential Integer Overflow',
    description: 'Arithmetic operations without SafeMath',
    recommendation: 'Use SafeMath or Solidity 0.8+ built-in overflow checks'
  }
} as const;