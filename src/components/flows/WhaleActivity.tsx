```tsx
import React from 'react';
import { whaleActivity } from './data';
import { formatCurrency } from '../../utils/formatters';
import { Icons } from '../icons';

export default function WhaleActivity() {
  return (
    <div className="space-y-3 md:space-y-4">
      {whaleActivity.map((activity, index) => (
        <div 
          key={index}
          className="flex items-center space-x-3 md:space-x-4 p-2 md:p-3 bg-black/30 border border-swiss-red/20"
        >
          <div className={`p-1.5 md:p-2 rounded-full ${
            activity.type === 'accumulation' ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            {activity.type === 'accumulation' ? 
              <Icons.TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-500" /> :
              <Icons.TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
            }
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs md:text-sm truncate">{activity.address}</span>
              <span className="font-mono text-xs md:text-sm ml-2">{activity.token}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-mono text-gray-400 truncate">
                {activity.timestamp.toLocaleTimeString()}
              </span>
              <span className={`text-xs md:text-sm font-mono ${
                activity.type === 'accumulation' ? 'text-green-500' : 'text-red-500'
              }`}>
                {formatCurrency(activity.amount)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```