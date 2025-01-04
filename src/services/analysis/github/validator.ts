import { GithubError, ERROR_CODES } from './errors';

export interface RepoMetrics {
  stars: number;
  forks: number;
  issues: number;
  commits: number;
  contributors: number;
  lastUpdate: Date;
  createdAt: Date;
}

export async function validateRepository(owner: string, repo: string): Promise<RepoMetrics> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Johnny-AI'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new GithubError('Repository not found', 404, ERROR_CODES.NOT_FOUND);
      }
      throw new GithubError('Failed to fetch repository data', response.status);
    }

    const data = await response.json();
    
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      commits: await getCommitCount(owner, repo),
      contributors: await getContributorCount(owner, repo),
      lastUpdate: new Date(data.updated_at),
      createdAt: new Date(data.created_at)
    };
  } catch (error) {
    if (error instanceof GithubError) throw error;
    throw new GithubError('Failed to validate repository', undefined, ERROR_CODES.FETCH_ERROR);
  }
}

async function getCommitCount(owner: string, repo: string): Promise<number> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Johnny-AI'
    }
  });
  
  const link = response.headers.get('link');
  if (!link) return 0;
  
  const match = link.match(/page=(\d+)>; rel="last"/);
  return match ? parseInt(match[1]) : 0;
}

async function getContributorCount(owner: string, repo: string): Promise<number> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Johnny-AI'
    }
  });
  
  const link = response.headers.get('link');
  if (!link) return 0;
  
  const match = link.match(/page=(\d+)>; rel="last"/);
  return match ? parseInt(match[1]) : 0;
}