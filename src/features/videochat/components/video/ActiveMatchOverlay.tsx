import React from 'react';
import { motion } from 'framer-motion';

interface ActiveMatchOverlayProps {
  status: 'searching' | 'connecting';
  onQuit: () => void;
  onGenderClick?: () => void;
}

const ActiveMatchOverlay: React.FC<ActiveMatchOverlayProps> = ({ status, onQuit, onGenderClick }) => {
  // Facts from your screenshots
  const facts = [
    "Monkeys express affection by grooming each other.",
    "King of hearts is the only king w/o a mustache."
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#7c7fff] z-10 flex flex-col items-center justify-center p-6 text-center"
    >
      {/* 1. Monkey Emojis (Matches image_f335a5.png) */}
      <div className="flex gap-3 text-4xl mb-6">
        <span>🙊</span>
        <span>🙈</span>
        <span>🙉</span>
      </div>

      {/* 2. Fact Text */}
      <p className="text-white font-medium text-lg max-w-[240px] leading-tight mb-12">
        {status === 'searching' ? facts[0] : "Connecting..."}
      </p>

      {/* 3. Action Buttons (Matches Screenshot 2026-02-15 230142.jpg) */}
      <div className="flex flex-col gap-3 w-full max-w-[220px]">
        <button 
          onClick={onGenderClick}
          className="w-full py-3 bg-white/10 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 border border-white/5 hover:bg-white/20 transition-all"
        >
          <span>👫</span> Both
        </button>
        
        <button 
          onClick={onQuit}
          className="w-full py-3 bg-white/10 rounded-xl text-white font-black text-sm border border-white/5 uppercase tracking-widest hover:bg-red-500/20 transition-all"
        >
          QUIT
        </button>
      </div>
    </motion.div>
  );
};

export default ActiveMatchOverlay;