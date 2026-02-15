import React from 'react';
import { motion } from 'framer-motion';
import { INTEREST_OPTIONS } from '../../data/interests';

interface InterestPickerProps {
  selectedInterests: string[];
  onToggleInterest: (id: string) => void;
}

const InterestPicker: React.FC<InterestPickerProps> = ({ selectedInterests, onToggleInterest }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4 max-w-sm mx-auto">
      {INTEREST_OPTIONS.map((item) => {
        const isSelected = selectedInterests.includes(item.id);
        return (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggleInterest(item.id)}
            className={`px-3 py-2 rounded-xl font-black text-[10px] uppercase tracking-tighter transition-all border-2 flex items-center gap-1.5 ${
              isSelected 
                ? 'bg-[#ffff00] border-[#ffff00] text-black shadow-lg shadow-[#ffff00]/20' 
                : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10'
            }`}
          >
            <span>{item.emoji}</span>
            {item.label}
          </motion.button>
        );
      })}
    </div>
  );
};

export default InterestPicker;