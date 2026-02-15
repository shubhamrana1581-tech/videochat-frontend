import React from 'react';
import { motion } from 'framer-motion';

interface VibeSelectorProps {
  selectedInterests: string[];
  onToggleInterest: (id: string) => void;
}

const INTERESTS = [
  { id: 'gaming', label: 'GAMING', icon: '🎮' },
  { id: 'music', label: 'MUSIC', icon: '🎵' },
  { id: 'fashion', label: 'FASHION', icon: '💅' },
  { id: 'fitness', label: 'FITNESS', icon: '💪' },
  { id: 'movies', label: 'MOVIES', icon: '🎬' },
  { id: 'art', label: 'ART', icon: '🎨' },
  { id: 'tech', label: 'TECH', icon: '💻' },
  { id: 'anime', label: 'ANIME', icon: '⛩️' },
  { id: 'travel', label: 'TRAVEL', icon: '✈️' },
];

const VibeSelector: React.FC<VibeSelectorProps> = ({ selectedInterests, onToggleInterest }) => {
  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/5 overflow-y-auto custom-scrollbar">
      {/* 1. Header Section */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="text-4xl mb-4 animate-pulse">✨</div>
        <h2 className="text-white font-black italic text-2xl tracking-tighter mb-2">
          WHAT'S YOUR VIBE?
        </h2>
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
          Select interests to find better matches
        </p>
      </div>

      {/* 2. Interests Grid */}
      <div className="grid grid-cols-2 gap-3">
        {INTERESTS.map((item) => {
          const isActive = selectedInterests.includes(item.id);
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleInterest(item.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-[10px] font-black transition-all border ${
                isActive 
                  ? 'bg-[#ffff00] border-[#ffff00] text-black shadow-[0_10px_20px_rgba(255,255,0,0.2)]' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default VibeSelector;