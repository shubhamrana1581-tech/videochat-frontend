import React from 'react';
import { motion } from 'framer-motion';

const ConnectingScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full bg-[#6366f1] flex flex-col items-center justify-center relative z-20"
    >
      {/* Centered Content */}
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full border-4 border-white/20 overflow-hidden mb-4 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" 
            alt="Stranger" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <h2 className="text-white font-black text-2xl mb-1">Yuhatin</h2>
        <p className="text-white/70 font-bold text-sm">He's 33 from United States</p>
      </div>

      {/* Animated Bottom Text */}
      <div className="absolute bottom-12 w-full text-center">
        <motion.p 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white font-black text-lg tracking-widest uppercase italic"
        >
          Connecting...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ConnectingScreen;