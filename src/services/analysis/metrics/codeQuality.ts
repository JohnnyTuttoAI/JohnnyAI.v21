export interface CodeQualityMetrics {
  readabilityScore: number;
  complexityScore: number;
  testCoverage?: number;
  maintainabilityIndex: number;
}

export function calculateCodeQuality(sourceCode: string): CodeQualityMetrics {
  return {
    readabilityScore: calculateReadabilityScore(sourceCode),
    complexityScore: calculateComplexityScore(sourceCode),
    maintainabilityIndex: calculateMaintainabilityIndex(sourceCode)
  };
}

function calculateReadabilityScore(sourceCode: string): number {
  const metrics = {
    avgLineLength: getAverageLineLength(sourceCode),
    commentRatio: getCommentRatio(sourceCode),
    functionSize: getAverageFunctionSize(sourceCode)
  };

  return normalizeScore(
    metrics.avgLineLength * 0.3 +
    metrics.commentRatio * 0.4 +
    metrics.functionSize * 0.3
  );
}

function calculateComplexityScore(sourceCode: string): number {
  const metrics = {
    cyclomaticComplexity: getCyclomaticComplexity(sourceCode),
    nesting: getMaxNestingLevel(sourceCode),
    dependencies: getDependencyCount(sourceCode)
  };

  return normalizeScore(
    metrics.cyclomaticComplexity * 0.4 +
    metrics.nesting * 0.3 +
    metrics.dependencies * 0.3
  );
}

function calculateMaintainabilityIndex(sourceCode: string): number {
  const metrics = {
    volume: getHalsteadVolume(sourceCode),
    complexity: getCyclomaticComplexity(sourceCode),
    loc: getLinesOfCode(sourceCode)
  };

  return normalizeScore(
    171 - 
    5.2 * Math.log(metrics.volume) -
    0.23 * metrics.complexity -
    16.2 * Math.log(metrics.loc)
  );
}

// Helper functions
function getAverageLineLength(code: string): number {
  const lines = code.split('\n').filter(line => line.trim());
  return lines.reduce((sum, line) => sum + line.length, 0) / lines.length;
}

function getCommentRatio(code: string): number {
  const comments = code.match(/\/\*[\s\S]*?\*\/|\/\/.*/g) || [];
  const totalLines = code.split('\n').length;
  return comments.length / totalLines;
}

function getAverageFunctionSize(code: string): number {
  const functions = code.match(/function\s+\w+\s*\([^)]*\)\s*{[^}]*}/g) || [];
  if (functions.length === 0) return 0;
  return functions.reduce((sum, fn) => sum + fn.split('\n').length, 0) / functions.length;
}

function getCyclomaticComplexity(code: string): number {
  const conditions = (code.match(/if|while|for|&&|\|\||case/g) || []).length;
  return conditions + 1;
}

function getMaxNestingLevel(code: string): number {
  let maxLevel = 0;
  let currentLevel = 0;
  
  for (const char of code) {
    if (char === '{') {
      currentLevel++;
      maxLevel = Math.max(maxLevel, currentLevel);
    } else if (char === '}') {
      currentLevel--;
    }
  }
  
  return maxLevel;
}

function getDependencyCount(code: string): number {
  const imports = code.match(/import\s+.*?from/g) || [];
  return imports.length;
}

function getHalsteadVolume(code: string): number {
  // Simplified Halstead volume calculation
  const operators = code.match(/[+\-*/%=<>!&|^~?:]+/g) || [];
  const operands = code.match(/\b(?!\d)\w+\b/g) || [];
  return (operators.length + operands.length) * Math.log2(new Set([...operators, ...operands]).size);
}

function getLinesOfCode(code: string): number {
  return code.split('\n').filter(line => line.trim()).length;
}

function normalizeScore(score: number): number {
  return Math.max(0, Math.min(100, score));
}