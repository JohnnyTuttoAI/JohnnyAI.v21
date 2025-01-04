import { RepoMetrics } from './validator';

export interface RepoAnalysis {
  legitimacyScore: number;
  activityScore: number;
  communityScore: number;
  flags: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export function analyzeRepository(metrics: RepoMetrics): RepoAnalysis {
  const flags: string[] = [];
  
  // Calculate age in days
  const ageInDays = (Date.now() - metrics.createdAt.getTime()) / (1000 * 60 * 60 * 24);
  
  // Calculate activity metrics
  const daysSinceLastUpdate = (Date.now() - metrics.lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
  const commitsPerDay = metrics.commits / ageInDays;
  
  // Legitimacy checks
  if (ageInDays < 30) flags.push('Repository is less than 30 days old');
  if (metrics.contributors < 2) flags.push('Single contributor repository');
  if (commitsPerDay > 50) flags.push('Unusually high commit frequency');
  if (daysSinceLastUpdate > 365) flags.push('No updates in over a year');
  
  // Calculate scores
  const legitimacyScore = calculateLegitimacyScore(metrics, ageInDays);
  const activityScore = calculateActivityScore(metrics, daysSinceLastUpdate, commitsPerDay);
  const communityScore = calculateCommunityScore(metrics);
  
  // Determine risk level
  const averageScore = (legitimacyScore + activityScore + communityScore) / 3;
  const riskLevel = averageScore >= 0.7 ? 'LOW' : averageScore >= 0.4 ? 'MEDIUM' : 'HIGH';
  
  return {
    legitimacyScore,
    activityScore,
    communityScore,
    flags,
    riskLevel
  };
}

function calculateLegitimacyScore(metrics: RepoMetrics, age: number): number {
  let score = 0;
  
  // Age factor (max 0.3)
  score += Math.min(age / 365, 1) * 0.3;
  
  // Contributors factor (max 0.3)
  score += Math.min(metrics.contributors / 10, 1) * 0.3;
  
  // Commit history factor (max 0.4)
  score += Math.min(metrics.commits / 100, 1) * 0.4;
  
  return score;
}

function calculateActivityScore(
  metrics: RepoMetrics,
  daysSinceUpdate: number,
  commitsPerDay: number
): number {
  let score = 0;
  
  // Recent updates factor (max 0.4)
  score += Math.max(1 - (daysSinceUpdate / 365), 0) * 0.4;
  
  // Commit frequency factor (max 0.3)
  const idealCommitsPerDay = 0.5; // Baseline for healthy activity
  score += Math.min(commitsPerDay / idealCommitsPerDay, 1) * 0.3;
  
  // Issues factor (max 0.3)
  score += Math.min(metrics.issues / 10, 1) * 0.3;
  
  return score;
}

function calculateCommunityScore(metrics: RepoMetrics): number {
  let score = 0;
  
  // Stars factor (max 0.4)
  score += Math.min(metrics.stars / 100, 1) * 0.4;
  
  // Forks factor (max 0.3)
  score += Math.min(metrics.forks / 50, 1) * 0.3;
  
  // Contributors factor (max 0.3)
  score += Math.min(metrics.contributors / 20, 1) * 0.3;
  
  return score;
}