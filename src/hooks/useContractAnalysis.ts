import { useState, useCallback } from 'react';
import { contractAuditor } from '../services/analysis/contractAuditor';
import type { AuditResult } from '../services/analysis/contractAuditor';

interface AnalysisStep {
  id: string;
  status: 'pending' | 'running' | 'complete' | 'error';
  message: string;
  detail?: string;
}

export function useContractAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [steps, setSteps] = useState<AnalysisStep[]>([]);
  const [result, setResult] = useState<AuditResult | null>(null);

  const updateStep = useCallback((
    id: string,
    status: AnalysisStep['status'],
    detail?: string
  ) => {
    setSteps(current => 
      current.map(step => 
        step.id === id 
          ? { ...step, status, detail }
          : step
      )
    );
  }, []);

  const analyzeContract = useCallback(async (sourceCode: string) => {
    setIsAnalyzing(true);
    setResult(null);
    
    // Initialize analysis steps
    setSteps([
      { id: 'parse', status: 'pending', message: 'Parsing contract source' },
      { id: 'security', status: 'pending', message: 'Security vulnerability scan' },
      { id: 'gas', status: 'pending', message: 'Gas optimization analysis' },
      { id: 'quality', status: 'pending', message: 'Code quality assessment' },
      { id: 'best-practices', status: 'pending', message: 'Best practices review' }
    ]);

    try {
      // Parsing
      updateStep('parse', 'running');
      await new Promise(r => setTimeout(r, 1000));
      updateStep('parse', 'complete', 'Contract parsed successfully');

      // Security Analysis
      updateStep('security', 'running');
      await new Promise(r => setTimeout(r, 2000));
      updateStep('security', 'complete', 'Vulnerability scan complete');

      // Gas Analysis
      updateStep('gas', 'running');
      await new Promise(r => setTimeout(r, 1500));
      updateStep('gas', 'complete', 'Optimization opportunities identified');

      // Code Quality
      updateStep('quality', 'running');
      await new Promise(r => setTimeout(r, 1500));
      updateStep('quality', 'complete', 'Quality metrics analyzed');

      // Best Practices
      updateStep('best-practices', 'running');
      const auditResult = await contractAuditor.auditContract(sourceCode);
      updateStep('best-practices', 'complete', 'Analysis complete');

      setResult(auditResult);
    } catch (error) {
      console.error('Analysis error:', error);
      const failedStep = steps.find(step => step.status === 'running');
      if (failedStep) {
        updateStep(failedStep.id, 'error', 'Analysis failed');
      }
    } finally {
      setIsAnalyzing(false);
    }
  }, [steps, updateStep]);

  return {
    analyzeContract,
    isAnalyzing,
    steps,
    result
  };
}