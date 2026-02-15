import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldAlert, ChevronRight } from 'lucide-react';
import ChatTimer from './ChatTimer';
import ChatOverlay from './ChatOverlay';
import ChatInput from './ChatInput';

interface ConnectedChatUIProps {
  // Fixed the TS Ref Error by allowing null
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  timeLeft: number;
  onAddTime: () => void;
  onNext: () => void;
  onReport: () => void;
  onToggleTheater: () => void;
  isTheaterMode: boolean;
  messages: any[];
  onSendMessage: (text: string) => void;
  selectedInterests: string[];
}

const ConnectedChatUI: React.FC<ConnectedChatUIProps> = ({
  videoRef,
  stream,
  timeLeft,
  onAddTime,
  onNext,
  onReport,
  onToggleTheater,
  isTheaterMode,
  messages,
  onSendMessage,
  selectedInterests
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full bg-black overflow-hidden"
    >
      {/* 1. THE VIDEO FEED */}
      <video 
        ref={videoRef}
        autoPlay 
        playsInline 
        className="w-full h-full object-cover"
      />

      {/* 2. TOP HEADER OVERLAY (User Info & Actions) */}
      <div className="absolute top-0 left-0 w-full p-5 pt-7 flex justify-between items-start bg-gradient-to-b from-black/80 via-black/20 to-transparent z-30">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-black text-xl italic tracking-tighter drop-shadow-lg">
              Stranger
            </h3>
            <span className="w-2 h-2 bg-[#22c55e] rounded-full shadow-[0_0_10px_#22c55e] animate-pulse" />
          </div>
          <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] drop-shadow-md">
            United States
          </p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={onReport}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-red-500 border border-white/10 hover:bg-red-500 hover:text-white transition-all shadow-xl"
          >
            <ShieldAlert size={20} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-[#ffff00] border border-white/10 hover:bg-[#ffff00] hover:text-black transition-all shadow-xl">
            <Heart size={20} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* 3. TIMER & INTEREST TAGS */}
      <div className="absolute top-24 left-6 z-30 flex flex-col gap-3">
        <ChatTimer seconds={timeLeft} onAddTime={onAddTime} />
        
        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
          {selectedInterests.map(id => (
            <span key={id} className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md text-[8px] text-[#ffff00] font-black uppercase italic border border-white/5 shadow-lg">
              #{id}
            </span>
          ))}
        </div>
      </div>

      {/* 4. CHAT OVERLAY (The floating messages) */}
      <ChatOverlay messages={messages} />

      {/* 5. BOTTOM INPUT & NEXT BUTTON */}
      <div className="absolute bottom-6 left-6 right-6 z-40 flex items-center gap-4">
        <div className="flex-1">
          <ChatInput onSendMessage={onSendMessage} />
        </div>

        <button 
          onClick={onNext}
          className="group h-[54px] px-6 bg-[#ffff00] text-black rounded-3xl font-black italic text-sm flex items-center gap-2 shadow-[0_10px_30px_rgba(255,255,0,0.3)] hover:scale-105 active:scale-95 transition-all border-b-4 border-black/20"
        >
          NEXT
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Subtle Bottom Vignette */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default ConnectedChatUI;