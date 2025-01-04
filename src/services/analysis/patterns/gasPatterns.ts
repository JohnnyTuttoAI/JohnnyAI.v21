export const GAS_PATTERNS = {
  storage: {
    pattern: /(uint8|uint16|uint32|uint64|uint128)/,
    title: 'Sub-optimal Storage',
    recommendation: 'Use uint256 for better gas efficiency unless smaller sizes are necessary'
  },
  loops: {
    pattern: /for\s*\([^;]+;[^;]+;[^)]+\)/,
    title: 'Loop Optimization',
    recommendation: 'Cache array length outside loops to save gas'
  },
  constants: {
    pattern: /(\w+)\s*=\s*([0-9]+|"[^"]*")\s*;/,
    title: 'Constant Variables',
    recommendation: 'Use constant or immutable for constant values'
  }
} as const;