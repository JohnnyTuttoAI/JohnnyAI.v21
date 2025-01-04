import { AuditResult, Vulnerability, SecurityCheck } from './types';
import { SECURITY_PATTERNS } from './patterns/securityPatterns';
import { GAS_PATTERNS } from './patterns/gasPatterns';
import { calculateCodeQuality } from './metrics/codeQuality';

export class ContractAuditor {
  async auditContract(sourceCode: string): Promise<AuditResult> {
    try {
      const vulnerabilities = this.findVulnerabilities(sourceCode);
      const gasOptimizations = this.findGasOptimizations(sourceCode);
      const codeQuality = calculateCodeQuality(sourceCode);
      const securityChecks = this.performSecurityChecks(sourceCode);
      
      const score = this.calculateScore({
        vulnerabilities,
        gasOptimizations,
        codeQuality,
        securityChecks
      });

      return {
        score,
        vulnerabilities,
        gasOptimizations,
        suggestions: this.generateSuggestions(vulnerabilities, gasOptimizations),
        overallRisk: this.determineRiskLevel(score),
        codeQuality,
        securityChecks
      };
    } catch (error) {
      console.error('Contract audit error:', error);
      throw error;
    }
  }

  private findVulnerabilities(sourceCode: string): Vulnerability[] {
    const vulnerabilities: Vulnerability[] = [];

    Object.entries(SECURITY_PATTERNS).forEach(([key, pattern]) => {
      if (pattern.pattern.test(sourceCode)) {
        vulnerabilities.push({
          severity: pattern.severity,
          title: pattern.title,
          description: pattern.description,
          location: `Pattern found in contract`,
          recommendation: pattern.recommendation
        });
      }
    });

    return vulnerabilities;
  }

  private findGasOptimizations(sourceCode: string): string[] {
    const optimizations: string[] = [];

    Object.entries(GAS_PATTERNS).forEach(([key, pattern]) => {
      if (pattern.pattern.test(sourceCode)) {
        optimizations.push(pattern.recommendation);
      }
    });

    return optimizations;
  }

  private performSecurityChecks(sourceCode: string): SecurityCheck[] {
    return [
      this.checkAccessControl(sourceCode),
      this.checkReentrancyProtection(sourceCode),
      this.checkOverflowProtection(sourceCode)
    ];
  }

  private checkAccessControl(sourceCode: string): SecurityCheck {
    const hasAccessControl = /onlyOwner|require\(msg\.sender/.test(sourceCode);
    return {
      name: 'Access Control',
      status: hasAccessControl ? 'PASS' : 'WARNING',
      details: hasAccessControl 
        ? 'Basic access control implemented'
        : 'No access control found'
    };
  }

  private checkReentrancyProtection(sourceCode: string): SecurityCheck {
    const hasReentrancyGuard = /ReentrancyGuard|nonReentrant/.test(sourceCode);
    return {
      name: 'Reentrancy Protection',
      status: hasReentrancyGuard ? 'PASS' : 'WARNING',
      details: hasReentrancyGuard
        ? 'Reentrancy protection implemented'
        : 'No reentrancy protection found'
    };
  }

  private checkOverflowProtection(sourceCode: string): SecurityCheck {
    const hasOverflowProtection = /SafeMath|pragma solidity >=0\.8/.test(sourceCode);
    return {
      name: 'Overflow Protection',
      status: hasOverflowProtection ? 'PASS' : 'WARNING',
      details: hasOverflowProtection
        ? 'Overflow protection implemented'
        : 'No overflow protection found'
    };
  }

  private calculateScore(metrics: {
    vulnerabilities: Vulnerability[];
    gasOptimizations: string[];
    codeQuality: any;
    securityChecks: SecurityCheck[];
  }): number {
    const securityScore = this.calculateSecurityScore(metrics.vulnerabilities);
    const gasScore = Math.max(0, 100 - metrics.gasOptimizations.length * 5);
    const qualityScore = (
      metrics.codeQuality.readabilityScore * 0.4 +
      metrics.codeQuality.complexityScore * 0.3 +
      metrics.codeQuality.maintainabilityIndex * 0.3
    );

    return Math.round(
      securityScore * 0.5 +
      gasScore * 0.2 +
      qualityScore * 0.3
    );
  }

  private calculateSecurityScore(vulnerabilities: Vulnerability[]): number {
    const severityWeights = {
      CRITICAL: 25,
      HIGH: 15,
      MEDIUM: 10,
      LOW: 5
    };

    const totalDeductions = vulnerabilities.reduce((sum, vuln) => 
      sum + severityWeights[vuln.severity], 0);

    return Math.max(0, 100 - totalDeductions);
  }

  private determineRiskLevel(score: number): 'LOW' | 'MEDIUM' | 'HIGH' {
    if (score >= 80) return 'LOW';
    if (score >= 60) return 'MEDIUM';
    return 'HIGH';
  }

  private generateSuggestions(
    vulnerabilities: Vulnerability[],
    gasOptimizations: string[]
  ): string[] {
    const suggestions: string[] = [];

    if (vulnerabilities.length > 0) {
      suggestions.push('Address identified security vulnerabilities');
    }

    if (gasOptimizations.length > 0) {
      suggestions.push('Implement suggested gas optimizations');
    }

    suggestions.push('Add comprehensive test coverage');
    suggestions.push('Document contract functionality');
    
    return suggestions;
  }
}

export const contractAuditor = new ContractAuditor();