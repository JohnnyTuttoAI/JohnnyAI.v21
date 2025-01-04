import React from 'react';
import { Icons } from '../../icons';
import { useCompanyAnalysis } from '../../../hooks/useCompanyAnalysis';
import type { CompanySearchResult } from '../../../services/analysis/company/types';
import { formatPercentage } from '../../../utils/formatters';

interface CompanyAnalysisProps {
  company: CompanySearchResult;
  onBack: () => void;
}

export default function CompanyAnalysis({ company, onBack }: CompanyAnalysisProps) {
  const { analysis, isLoading } = useCompanyAnalysis(company.id);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-swiss-red/10 rounded w-3/4"></div>
        <div className="h-4 bg-swiss-red/10 rounded w-1/2"></div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-swiss-red hover:text-cyber-blue transition-colors"
        >
          <Icons.ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-right">
          <div className="font-mono text-lg">{company.name}</div>
          <div className="text-sm text-gray-400">{company.ticker}</div>
        </div>
      </div>

      {/* Financial Health */}
      <div className="bg-black/50 border border-swiss-red/10 p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-swiss">Financial Health</h3>
          <div className="text-lg font-mono text-cyber-blue">
            {analysis.financialHealth.score.toFixed(0)}/100
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {Object.entries(analysis.financialHealth.metrics).map(([key, value]) => (
            <div key={key}>
              <div className="text-gray-400">{key}</div>
              <div className="font-mono">{formatPercentage(value)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Position */}
      <div className="bg-black/50 border border-swiss-red/10 p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-swiss">Market Position</h3>
          <div className="text-lg font-mono text-cyber-purple">
            {analysis.marketPosition.score.toFixed(0)}/100
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {Object.entries(analysis.marketPosition.metrics).map(([key, value]) => (
            <div key={key}>
              <div className="text-gray-400">{key}</div>
              <div className="font-mono">{formatPercentage(value)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-black/50 border border-swiss-red/10 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-swiss">Risk Assessment</h3>
          <div className={`text-lg font-mono ${
            analysis.riskAssessment.level === 'LOW' ? 'text-green-500' :
            analysis.riskAssessment.level === 'MEDIUM' ? 'text-yellow-500' :
            'text-red-500'
          }`}>
            {analysis.riskAssessment.level}
          </div>
        </div>
        <div className="space-y-2">
          {analysis.riskAssessment.factors.map((factor, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <span className="w-1 h-1 bg-swiss-red"></span>
              <span className="font-mono text-gray-400">{factor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="bg-black/50 border border-swiss-red/10 p-4">
        <h3 className="font-swiss mb-4">Growth Metrics</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          {Object.entries(analysis.growthMetrics).map(([key, value]) => (
            <div key={key}>
              <div className="text-gray-400">{key}</div>
              <div className={`font-mono ${
                value >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {formatPercentage(value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}