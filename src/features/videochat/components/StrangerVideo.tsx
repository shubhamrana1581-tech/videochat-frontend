import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChatStatus } from '../types';

interface Props {
  stream: MediaStream | null;
  status: ChatStatus;
}

const StrangerVideo: React.FC<Props> = ({ stream, status }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream && status === 'connected') {
      videoRef.current.srcObject = stream;
    }
  }, [stream, status]);

  return (
    <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
      <AnimatePresence mode="wait">
        {(status === 'searching' || status === 'requesting') && (
          <motion.div 
            key="searching"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-[#0f0b21] flex flex-col items-center justify-center"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-40 h-40 bg-purple-600 rounded-full blur-[60px] absolute"
            />
            <h2 className="text-2xl font-black text-white italic tracking-widest animate-pulse">SEARCHING...</h2>
          </motion.div>
        )}
      </AnimatePresence>

      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      
      {status === 'connected' && (
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full shadow-lg">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase text-white">Stranger Connected</span>
        </div>
      )}
    </div>
  );
};

export default StrangerVideo;