export interface AuditResult {
  score: number;
  vulnerabilities: Vulnerability[];
  suggestions: string[];
  gasOptimizations: string[];
  overallRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  codeQuality: CodeQualityMetrics;
  securityChecks: SecurityCheck[];
}

export interface Vulnerability {
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  location: string;
  recommendation: string;
}

export interface CodeQualityMetrics {
  readabilityScore: number;
  complexityScore: number;
  testCoverage?: number;
  maintainabilityIndex: number;
}

export interface SecurityCheck {
  name: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  details: string;
}