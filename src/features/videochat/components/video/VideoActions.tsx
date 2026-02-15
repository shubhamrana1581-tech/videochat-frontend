import React from 'react';
import { UserPlus, Flag, Maximize2, Minimize2, Camera } from 'lucide-react';

interface VideoActionsProps {
  onReport: () => void;
  onToggleTheater: () => void;
  onSnapshot: () => void; // <--- ADD THIS LINE to fix the error
  isTheaterMode: boolean;
}

const VideoActions: React.FC<VideoActionsProps> = ({ 
  onReport, 
  onToggleTheater, 
  onSnapshot, // <--- Destructure it here
  isTheaterMode 
}) => {
  return (
    <div className="absolute top-6 right-6 flex flex-col gap-3 z-20">
      {/* Add Friend */}
      <button className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all border border-white/10 group">
        <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Snapshot / Camera Button */}
      <button 
        onClick={onSnapshot}
        className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-[#ffff00] hover:text-black transition-all border border-white/10"
        title="Take Snapshot"
      >
        <Camera size={20} />
      </button>

      {/* Theater Mode Toggle */}
      <button 
        onClick={onToggleTheater}
        className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all border border-white/10"
      >
        {isTheaterMode ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
      </button>

      {/* Report Button */}
      <button 
        onClick={onReport}
        className="p-3 bg-black/20 backdrop-blur-md rounded-2xl text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-all border border-white/5"
      >
        <Flag size={20} />
      </button>
    </div>
  );
};

export default VideoActions;