import React from 'react';
import { motion } from 'framer-motion';

interface AnalysisStep {
  id: string;
  status: 'pending' | 'running' | 'complete' | 'error';
  message: string;
  detail?: string;
}

interface AnalysisTerminalProps {
  steps: AnalysisStep[];
  isAnalyzing: boolean;
}

export default function AnalysisTerminal({ steps, isAnalyzing }: AnalysisTerminalProps) {
  return (
    <div className="bg-black border border-swiss-red/20 rounded-lg p-4 font-mono text-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-400">Johnny AI Contract Analysis</div>
      </div>

      <div className="space-y-2">
        {steps.map((step) => (
          <div key={step.id} className="space-y-1">
            <div className="flex items-center space-x-2">
              {step.status === 'running' && (
                <motion.div
                  className="w-2 h-2 bg-cyber-blue rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              {step.status === 'complete' && (
                <span className="text-green-500">✓</span>
              )}
              {step.status === 'error' && (
                <span className="text-red-500">✗</span>
              )}
              {step.status === 'pending' && (
                <span className="text-gray-500">○</span>
              )}
              <span className={
                step.status === 'running' ? 'text-cyber-blue' :
                step.status === 'complete' ? 'text-green-500' :
                step.status === 'error' ? 'text-red-500' :
                'text-gray-500'
              }>
                {step.message}
              </span>
            </div>
            {step.detail && (
              <div className="pl-6 text-gray-400 text-xs font-mono">{step.detail}</div>
            )}
          </div>
        ))}
      </div>

      {isAnalyzing && (
        <div className="mt-4 border-t border-swiss-red/20 pt-4">
          <div className="flex items-center space-x-2 text-cyber-blue">
            <motion.div
              className="w-2 h-2 bg-cyber-blue rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span>Analysis in progress...</span>
          </div>
        </div>
      )}
    </div>
  );
}