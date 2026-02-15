import React from 'react';
import { motion } from 'framer-motion';

interface SearchingOverlayProps {
  onQuit: () => void;
}

const SearchingOverlay: React.FC<SearchingOverlayProps> = ({ onQuit }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#7c7fff] z-50 flex flex-col items-center justify-center p-8 text-center"
    >
      {/* Monkey Emojis */}
      <div className="flex gap-4 text-5xl mb-8">
        <span>🙊</span>
        <span>🙈</span>
        <span>🙉</span>
      </div>
      
      {/* Fact Text */}
      <h3 className="text-white font-bold text-2xl max-w-[300px] leading-tight mb-12">
        Monkeys express affection by grooming each other.
      </h3>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-[260px]">
        <button className="w-full py-4 bg-white/10 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 border border-white/5 hover:bg-white/20 transition-all">
          <span className="text-lg">👫</span> Both
        </button>
        <button 
          onClick={onQuit}
          className="w-full py-4 bg-white/10 rounded-2xl text-white font-black text-sm border border-white/5 uppercase tracking-[0.2em] hover:bg-red-500/20 transition-all"
        >
          QUIT
        </button>
      </div>
    </motion.div>
  );
};

export default SearchingOverlay;