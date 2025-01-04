import { useState, useRef } from 'react';
import { githubClient } from '../../services/analysis/github/client';
import { ERROR_MESSAGES } from '../../services/analysis/github/errors';
import { Icons } from '../icons';
import { toast } from 'react-hot-toast';
import { useContractAnalysis } from '../../hooks/useContractAnalysis';
import AnalysisTerminal from './AnalysisTerminal';

export default function ContractAudit() {
  const [sourceCode, setSourceCode] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const { analyzeContract, isAnalyzing, steps, result } = useContractAnalysis();
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGithubFetch = async () => {
    if (!githubUrl.trim()) {
      toast.error('Please enter a GitHub URL');
      return;
    }

    try {
      const code = await githubClient.fetchContractSource(githubUrl);
      setSourceCode(code);
      toast.success('Contract source fetched successfully');
    } catch (error: any) {
      console.error('GitHub fetch error:', error);
      toast.error(ERROR_MESSAGES[error.code] || 'Failed to fetch contract source');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceCode.trim()) {
      toast.error('Please enter contract source code');
      return;
    }

    await analyzeContract(sourceCode);

    // Scroll to results after a short delay to ensure they're rendered
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* GitHub URL Input */}
      <div className="flex space-x-4">
        <input
          type="text"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="owner/repo/path or full GitHub URL"
          className="flex-1 bg-black border border-swiss-red/20 p-2 font-mono text-sm focus:outline-none focus:border-swiss-red"
        />
        <button
          onClick={handleGithubFetch}
          disabled={isAnalyzing}
          className="bg-swiss-red hover:bg-swiss-red/90 text-white px-4 font-mono disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Icons.FileText className="w-4 h-4" />
          Fetch
        </button>
      </div>

      <div className="text-center text-sm font-mono text-gray-400">- OR -</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-mono mb-2">Contract Source Code</label>
          <textarea
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            className="w-full h-64 bg-black border border-swiss-red/20 p-4 font-mono text-sm resize-none focus:outline-none focus:border-swiss-red"
            placeholder="Paste your smart contract code here..."
            spellCheck={false}
          />
        </div>

        <button
          type="submit"
          disabled={isAnalyzing || !sourceCode.trim()}
          className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white py-2 px-4 font-mono disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Icons.Brain className="w-4 h-4" />
          {isAnalyzing ? 'Analyzing...' : 'Analyze Contract'}
        </button>
      </form>

      {/* Analysis Terminal */}
      {(steps.length > 0 || isAnalyzing) && (
        <div ref={resultsRef}>
          <AnalysisTerminal steps={steps} isAnalyzing={isAnalyzing} />
        </div>
      )}

      {/* Analysis Results */}
      {result && (
        <div className="space-y-6 mt-8">
          <div className="p-4 bg-black/30 border border-swiss-red/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-swiss text-lg">Audit Score</h3>
              <div className={`text-2xl font-mono ${
                result.score >= 80 ? 'text-green-500' :
                result.score >= 60 ? 'text-yellow-500' :
                'text-red-500'
              }`}>
                {result.score}/100
              </div>
            </div>
            <div className={`text-sm font-mono ${
              result.overallRisk === 'LOW' ? 'text-green-500' :
              result.overallRisk === 'MEDIUM' ? 'text-yellow-500' :
              'text-red-500'
            }`}>
              Risk Level: {result.overallRisk}
            </div>
          </div>

          {/* Code Quality */}
          <div className="space-y-4">
            <h3 className="font-swiss text-lg">Code Quality</h3>
            <div className="grid grid-cols-3 gap-4">
              <QualityMetric 
                label="Readability"
                score={result.codeQuality.readabilityScore}
              />
              <QualityMetric 
                label="Complexity"
                score={result.codeQuality.complexityScore}
              />
              <QualityMetric 
                label="Maintainability"
                score={result.codeQuality.maintainabilityIndex}
              />
            </div>
          </div>

          {/* Vulnerabilities */}
          <div className="space-y-4">
            <h3 className="font-swiss text-lg">Vulnerabilities</h3>
            {result.vulnerabilities.map((vuln, index) => (
              <div key={index} className="p-4 bg-black/30 border border-swiss-red/20">
                <div className={`text-sm font-mono mb-2 ${
                  vuln.severity === 'CRITICAL' ? 'text-red-500' :
                  vuln.severity === 'HIGH' ? 'text-orange-500' :
                  vuln.severity === 'MEDIUM' ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {vuln.severity}: {vuln.title}
                </div>
                <p className="text-sm font-mono text-gray-400 mb-2">{vuln.description}</p>
                <p className="text-sm font-mono text-gray-400">Location: {vuln.location}</p>
                <p className="text-sm font-mono text-swiss-red mt-2">{vuln.recommendation}</p>
              </div>
            ))}
          </div>

          {/* Gas Optimizations */}
          <div className="space-y-4">
            <h3 className="font-swiss text-lg">Gas Optimizations</h3>
            {result.gasOptimizations.map((opt, index) => (
              <div key={index} className="p-2 bg-black/30 border border-swiss-red/20">
                <p className="text-sm font-mono">{opt}</p>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="space-y-4">
            <h3 className="font-swiss text-lg">Suggestions</h3>
            {result.suggestions.map((suggestion, index) => (
              <div key={index} className="p-2 bg-black/30 border border-swiss-red/20">
                <p className="text-sm font-mono">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function QualityMetric({ label, score }: { label: string; score: number }) {
  return (
    <div className="p-4 bg-black/30 border border-swiss-red/20">
      <div className="text-sm font-mono text-gray-400 mb-2">{label}</div>
      <div className={`text-xl font-mono ${
        score >= 80 ? 'text-green-500' :
        score >= 60 ? 'text-yellow-500' :
        'text-red-500'
      }`}>
        {score.toFixed(0)}%
      </div>
    </div>
  );
}