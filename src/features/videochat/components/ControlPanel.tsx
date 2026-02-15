import React from 'react';
import { Loader2 } from 'lucide-react';
import GenderTrigger from './GenderTrigger';
import type { ChatStatus } from '../types'; // Ensure this path is correct

interface ControlPanelProps {
  status: ChatStatus; // <--- ADDED THIS LINE to fix the error
  onStart: () => void;
  onStop: () => void;
  onOpenGender: () => void;
  selectedGender: string;
  isSquadMode: boolean;
  setSquadMode: (val: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  status, 
  onStart, 
  onStop,
  onOpenGender, 
  selectedGender ,
  isSquadMode,
  setSquadMode
}) => {
  const isSearching = status === 'searching' || status === 'requesting';
  const isConnected = status === 'connected';

  return (
    <div className="w-full h-full bg-[#7c3aed] p-8 flex flex-col items-center justify-between relative rounded-[2.5rem] border-4 border-white/10 shadow-2xl">
      {/* ... rest of the component remains the same ... */}
      <div className="flex bg-black/10 p-1 rounded-xl mt-4">
      <button 
    onClick={() => setSquadMode(false)}
    className={`px-6 py-1.5 rounded-lg font-bold text-[10px] transition-all ${
      !isSquadMode ? 'bg-[#ffff00] text-black shadow-md' : 'text-white/50 hover:text-white'
    }`}
  >
    SOLO
  </button>
  <button 
    onClick={() => setSquadMode(true)}
    className={`px-6 py-1.5 rounded-lg font-bold text-[10px] transition-all ${
      isSquadMode ? 'bg-[#ffff00] text-black shadow-md' : 'text-white/50 hover:text-white'
    }`}
  >
    SQUAD
  </button>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-[#6366f1] rounded-3xl flex items-center justify-center shadow-2xl mb-4 border-4 border-white/10">
          <span className="text-5xl">🐵</span>
        </div>
        <h2 className="text-5xl font-black text-white mb-2 italic">Monkey</h2>
        <p className="text-white/80 font-bold text-sm max-w-[180px] leading-tight">Make new friends face-to-face</p>
      </div>

      <div className="w-full">
        <GenderTrigger selectedGender={selectedGender} onClick={onOpenGender} />
        <button 
          onClick={isSearching ? onStop : onStart}
          className={`w-full py-5 flex items-center justify-center gap-3 text-black font-black text-xl rounded-2xl shadow-xl transition-all uppercase italic ${
            isSearching ? 'bg-[#ffff00]/80' : 'bg-[#ffff00] hover:brightness-105 active:scale-95'
          }`}
        >
          {isSearching ? <><Loader2 className="animate-spin" size={24} /><span>SEARCHING...</span></> : <span>Start Video Chat</span>}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;