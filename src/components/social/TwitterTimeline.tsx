import React, { useEffect } from 'react';

export default function TwitterTimeline() {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative w-full max-w-sm">
      {/* Swiss-style frame */}
      <div className="absolute inset-0 border-2 border-swiss-red"></div>
      
      {/* Cyber overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 mix-blend-overlay pointer-events-none"></div>
      
      {/* Twitter Timeline */}
      <div className="relative bg-black/90">
        <a 
          className="twitter-timeline" 
          data-theme="dark"
          data-chrome="noheader nofooter noborders transparent"
          data-tweet-limit="3"
          href="https://twitter.com/Johnny__AI"
        >
          Loading tweets...
        </a>
      </div>
    </div>
  );
}