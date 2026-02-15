import React from 'react';
import { motion } from 'framer-motion';
import { User, Users } from 'lucide-react';

interface StartScreenProps {
  onStart: (mode: 'solo' | 'squad') => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center justify-center gap-8 h-full"
    >
      <div className="text-center">
        <h2 className="text-white font-black text-4xl italic tracking-tighter mb-2">READY TO MONKEY?</h2>
        <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Pick a mode to start matching</p>
      </div>

      <div className="flex gap-6">
        <button 
          onClick={() => onStart('solo')}
          className="group relative flex flex-col items-center gap-4 p-8 bg-white/5 hover:bg-[#ffff00] rounded-[3rem] transition-all duration-300 border-2 border-white/10 hover:border-black/20 w-48 shadow-2xl"
        >
          <div className="p-4 bg-white/10 rounded-2xl group-hover:bg-black/10">
            <User size={40} className="text-white group-hover:text-black" />
          </div>
          <span className="font-black text-white group-hover:text-black italic uppercase italic">Solo</span>
        </button>

        <button 
          onClick={() => onStart('squad')}
          className="group relative flex flex-col items-center gap-4 p-8 bg-white/5 hover:bg-[#6366f1] rounded-[3rem] transition-all duration-300 border-2 border-white/10 hover:border-white/20 w-48 shadow-2xl"
        >
          <div className="p-4 bg-white/10 rounded-2xl group-hover:bg-white/20">
            <Users size={40} className="text-white" />
          </div>
          <span className="font-black text-white italic uppercase italic">Squad</span>
        </button>
      </div>
    </motion.div>
  );
};

export default StartScreen;