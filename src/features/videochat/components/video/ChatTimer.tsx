import React from 'react';
import { Plus } from 'lucide-react';

interface ChatTimerProps {
  seconds: number;
  onAddTime: () => void;
}

const ChatTimer: React.FC<ChatTimerProps> = ({ seconds, onAddTime }) => {
  const isLowTime = seconds <= 5;

  return (
    <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
      {/* Time Display */}
      <div className={`h-12 w-12 rounded-full flex items-center justify-center font-black text-lg border-4 transition-colors shadow-lg ${
        isLowTime ? 'bg-red-500 border-red-400 animate-pulse' : 'bg-black/40 border-white/20 text-white'
      }`}>
        {seconds}
      </div>

      {/* Add Time Button */}
      <button 
        onClick={onAddTime}
        className="bg-[#ffff00] text-black px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-1 shadow-xl hover:scale-105 active:scale-95 transition-all"
      >
        <Plus size={14} strokeWidth={4} /> Add Time
      </button>
    </div>
  );
};

export default ChatTimer;