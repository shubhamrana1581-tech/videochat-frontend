import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

const OnlineCounter = () => {
  const [count, setCount] = useState(12402);

  // Simulate real-time fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = Math.floor(Math.random() * 10) - 5;
      setCount(prev => prev + fluctuation);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-10 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
      <div className="relative">
        <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
          <Users size={20} />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0817] animate-pulse" />
      </div>
      
      <div>
        <p className="text-xl font-black text-white tabular-nums">
          {count.toLocaleString()}
        </p>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          People Online Now
        </p>
      </div>
    </div>
  );
};

export default OnlineCounter;