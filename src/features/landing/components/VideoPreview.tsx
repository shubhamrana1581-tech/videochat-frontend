import React from 'react';
import ChatOverlay from './ChatOverlay';

const VideoPreview = () => (
  // Use h-full to match the screen height
  <div className="flex-1 relative hidden lg:flex items-center justify-center p-8 h-full">
    <div className="w-full h-full max-h-[90%] bg-white/5 rounded-[4rem] border border-white/10 relative overflow-hidden shadow-2xl backdrop-blur-xl">
      <img 
        src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2070&auto=format&fit=crop" 
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        alt="Match Preview"
      />
      
      <ChatOverlay />

      <div className="absolute top-10 left-10 bg-black/40 px-4 py-2 rounded-2xl border border-white/10 font-black text-[10px] uppercase tracking-widest">
        Live Matchmaking
      </div>
    </div>
  </div>
);

export default VideoPreview;