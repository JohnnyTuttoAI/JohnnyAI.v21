import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="lg:ml-60 pt-16 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {children}
      </div>
    </main>
  );
}