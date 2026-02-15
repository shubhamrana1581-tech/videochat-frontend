import React from 'react';
import { motion } from 'framer-motion';

interface ReportButtonProps {
  onClick: () => void;
}

const ReportButton: React.FC<ReportButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="absolute top-6 right-6 z-50 bg-black/40 hover:bg-red-500/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 transition-colors group"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">🚩</span>
        <span className="text-[10px] font-black text-white uppercase tracking-widest hidden group-hover:block transition-all">
          Report
        </span>
      </div>
    </motion.button>
  );
};

export default ReportButton;