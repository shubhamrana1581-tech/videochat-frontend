import React from 'react';
import { User, CameraOff } from 'lucide-react';

const VideoInterface = () => {
  return (
    <div className="flex-1 w-full flex flex-col md:flex-row gap-6 min-h-[450px] lg:min-h-[550px]">
      
      {/* Remote User (Stranger) */}
      <div className="flex-1 bg-black/40 rounded-[2.5rem] border-2 border-white/5 overflow-hidden relative group shadow-2xl">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
          <div className="relative">
            <User size={80} className="mb-4 animate-pulse" />
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-ping" />
          </div>
          <p className="font-black text-xl tracking-widest uppercase animate-pulse">Searching...</p>
        </div>
        
        {/* Actual Video Element */}
        <video className="w-full h-full object-cover relative z-10" autoPlay playsInline />
        
        {/* Status Indicator */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-blink" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Looking for someone...</span>
        </div>
      </div>

      {/* Local User (Self) */}
      <div className="flex-1 bg-black/40 rounded-[2.5rem] border-2 border-white/5 overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center text-white/10">
          <CameraOff size={80} />
        </div>
        
        {/* Local Video Element */}
        <video className="w-full h-full object-cover mirror relative z-10" autoPlay playsInline muted />
        
        {/* Label */}
        <div className="absolute bottom-6 right-6 z-20 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <span className="text-[10px] font-black uppercase tracking-tighter text-white/60">You</span>
        </div>
      </div>

      <style>{`
        .mirror { transform: scaleX(-1); }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .animate-blink { animation: blink 1.5s infinite; }
      `}</style>
    </div>
  );
};

export default VideoInterface;