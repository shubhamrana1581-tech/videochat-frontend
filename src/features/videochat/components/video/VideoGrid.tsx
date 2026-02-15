import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StrangerVideo from '../StrangerVideo';
import LocalVideo from '../LocalVideo';
import ActiveMatchOverlay from './ActiveMatchOverlay';

interface VideoGridProps {
  isSquadMode: boolean;
  remoteStream: MediaStream | null;
  localStream: MediaStream | null;
  status: any;
  onNext: () => void;
  onToggleTheater: () => void;
  onInvite: () => void;
  isTheaterMode: boolean;
  selectedInterests: string[];
//   onToggleInterest: (id: string) => void;
  onLocalStreamUpdate: (stream: MediaStream) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({
  isSquadMode,
  remoteStream,
  localStream,
  status,
  onNext,
  onToggleTheater,
  onInvite,
  isTheaterMode,
  selectedInterests,
//   onToggleInterest,
  onLocalStreamUpdate
}) => {
  // Logic to determine if we show the monkey facts and "Both/Quit" buttons
  const showOverlay = status === 'searching' || status === 'connecting';

  return (
    <motion.div 
      layout
      className={`flex-1 grid gap-4 h-full transition-all duration-500 ${
        isSquadMode ? 'grid-cols-2 grid-rows-2' : 'grid-cols-1 md:grid-cols-2'
      }`}
    >
      {/* 1. STRANGER VIDEO / MIDDLE PANEL AREA */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-black shadow-2xl border-4 border-white/10">
        <StrangerVideo 
          stream={remoteStream} 
          status={status} 
          onNext={onNext}
          onToggleTheater={onToggleTheater}
          isTheaterMode={isTheaterMode}
          selectedInterests={selectedInterests}
       
        />

        {/* This overlay handles the Monkey.app style facts and controls */}
        <AnimatePresence>
          {showOverlay && (
            <ActiveMatchOverlay 
              status={status} 
              onQuit={onNext} 
              onGenderClick={() => {
                /* This maintains segregation by allowing the overlay to trigger parent logic */
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* 2. LOCAL VIDEO AREA */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-[#12101f] shadow-2xl border-4 border-white/10">
        <LocalVideo 
          stream={localStream} 
          onStreamUpdate={onLocalStreamUpdate} 
        />
      </div>

      {/* 3. SQUAD MODE SLOTS */}
      {isSquadMode && (
        <>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[2.5rem] overflow-hidden bg-[#1a182e] border-4 border-dashed border-white/5 flex flex-col items-center justify-center group cursor-pointer hover:bg-white/5 transition-colors"
          >
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-3xl mb-3">👤</div>
            <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">Waiting for Friend</p>
          </motion.div>

          <motion.div 
            onClick={onInvite}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[2.5rem] overflow-hidden bg-[#1a182e] border-4 border-dashed border-[#ffff00]/20 flex flex-col items-center justify-center group cursor-pointer hover:bg-[#ffff00]/5 transition-all"
          >
            <div className="w-16 h-16 bg-[#ffff00]/10 rounded-full flex items-center justify-center text-[#ffff00] mb-3 group-hover:rotate-90 transition-transform">➕</div>
            <p className="text-[#ffff00] text-[10px] font-black uppercase tracking-widest">Invite to Squad</p>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default VideoGrid;