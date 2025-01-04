export const MARKET_PATTERNS = {
  ACCUMULATION: {
    signals: ['institutional buying', 'decreasing volatility', 'quiet accumulation'],
    message: 'Smart money accumulating with discretion',
    conviction: 0.85
  },
  DISTRIBUTION: {
    signals: ['increased marketing', 'retail enthusiasm', 'institutional selling'],
    message: 'Old money exiting methodically',
    conviction: 0.8
  },
  MARKUP: {
    signals: ['quality breakout', 'institutional validation', 'increasing volume'],
    message: 'Institutional price discovery phase',
    conviction: 0.9
  },
  MARKDOWN: {
    signals: ['distribution complete', 'retail exhaustion', 'smart money gone'],
    message: 'Capital preservation is paramount',
    conviction: 0.75
  }
} as const;

export const TRADING_PSYCHOLOGY = {
  FEAR: {
    indicators: ['retail panic', 'forced liquidations', 'quality discounted'],
    response: 'Opportunities arise in moments of weakness',
  },
  GREED: {
    indicators: ['retail euphoria', 'excessive leverage', 'institutional distribution'],
    response: 'Preserve capital when others speculate',
  },
  DISBELIEF: {
    indicators: ['retail exhaustion', 'institutional accumulation', 'quality ignored'],
    response: 'Smart money builds positions quietly',
  },
  EUPHORIA: {
    indicators: ['mass speculation', 'retail leverage', 'institutional exit'],
    response: 'When taxi drivers give tips, bankers take profit',
  }
} as const;