```typescript
import React from 'react';
import { Icons } from '../../icons';
import type { NewsItem } from '../../../services/api/polygon/types';

interface CompanyNewsProps {
  news?: NewsItem[];
}

export default function CompanyNews({ news }: CompanyNewsProps) {
  if (!news?.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-swiss text-lg">Latest News</h3>
      <div className="space-y-3">
        {news.map((item) => (
          <a
            key={item.id}
            href={item.article_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-black/50 border border-swiss-red/10 p-4 hover:border-swiss-red/30 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h4 className="font-mono text-cyber-blue">{item.title}</h4>
                <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{new Date(item.published_utc).toLocaleDateString()}</span>
                  <span>{item.author}</span>
                </div>
              </div>
              <Icons.ExternalLink className="w-4 h-4 text-swiss-red flex-shrink-0 ml-4" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
```