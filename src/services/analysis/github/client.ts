import { validateRepository } from './validator';
import { analyzeRepository } from './analyzer';
import { GithubError, ERROR_CODES } from './errors';
import type { RepoAnalysis } from './analyzer';

class GithubClient {
  private baseUrl = 'https://api.github.com';

  async analyzeRepositoryUrl(url: string): Promise<RepoAnalysis> {
    try {
      const { owner, repo } = this.parseGithubUrl(url);
      const metrics = await validateRepository(owner, repo);
      return analyzeRepository(metrics);
    } catch (error) {
      if (error instanceof GithubError) throw error;
      throw new GithubError(
        'Failed to analyze repository',
        undefined,
        ERROR_CODES.UNKNOWN_ERROR
      );
    }
  }

  async fetchContractSource(url: string): Promise<string> {
    try {
      const { owner, repo, path } = this.parseGithubUrl(url);
      
      const response = await fetch(
        `${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`,
        { 
          headers: { 
            'Accept': 'application/vnd.github.v3.raw',
            'User-Agent': 'Johnny-AI'
          }
        }
      );

      if (!response.ok) {
        switch (response.status) {
          case 404:
            throw new GithubError('Contract file not found', 404, ERROR_CODES.NOT_FOUND);
          case 403:
            throw new GithubError('Rate limit exceeded', 403, ERROR_CODES.RATE_LIMIT);
          default:
            throw new GithubError('Failed to fetch contract source', response.status);
        }
      }

      return response.text();
    } catch (error) {
      if (error instanceof GithubError) throw error;
      throw new GithubError('Failed to fetch contract source', undefined, ERROR_CODES.FETCH_ERROR);
    }
  }

  private parseGithubUrl(url: string): { owner: string; repo: string; path?: string } {
    try {
      // Handle shorthand format (owner/repo/path)
      if (!url.includes('://')) {
        const parts = url.split('/').filter(Boolean);
        if (parts.length < 2) {
          throw new GithubError(
            'Invalid shorthand format. Use: owner/repo or owner/repo/path',
            undefined,
            ERROR_CODES.INVALID_URL
          );
        }
        return {
          owner: parts[0],
          repo: parts[1],
          path: parts.slice(2).join('/')
        };
      }

      // Handle full GitHub URLs
      const parsed = new URL(url);
      if (!parsed.hostname.includes('github.com')) {
        throw new GithubError(
          'URL must be from github.com',
          undefined,
          ERROR_CODES.INVALID_URL
        );
      }

      const parts = parsed.pathname.split('/').filter(Boolean);
      if (parts.length < 2) {
        throw new GithubError(
          'Invalid GitHub URL',
          undefined,
          ERROR_CODES.INVALID_URL
        );
      }

      return {
        owner: parts[0],
        repo: parts[1],
        path: parts[2] === 'blob' ? parts.slice(4).join('/') : parts.slice(2).join('/')
      };
    } catch (error) {
      if (error instanceof GithubError) throw error;
      throw new GithubError(
        'Invalid GitHub URL format',
        undefined,
        ERROR_CODES.INVALID_URL
      );
    }
  }
}

export const githubClient = new GithubClient();