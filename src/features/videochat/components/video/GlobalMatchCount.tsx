import React, { useState, useEffect } from 'react';

const GlobalMatchCount: React.FC = () => {
  const [count, setCount] = useState(12405);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + (Math.random() > 0.5 ? Math.floor(Math.random() * 3) : -Math.floor(Math.random() * 2)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden sm:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
      <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
      <span className="text-white/60 font-black text-[9px] tabular-nums uppercase tracking-[0.15em]">
        {count.toLocaleString()} <span className="text-white/30">Live</span>
      </span>
    </div>
  );
};

export default GlobalMatchCount;