import React from 'react';
import GenderTrigger from './GenderTrigger';

interface ControlPanelProps {
  onStart: () => void;
  onOpenGender: () => void;
  selectedGender: string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onStart, onOpenGender, selectedGender }) => {
  return (
    <div className="w-full lg:w-[400px] h-full bg-[#7c3aed] p-8 flex flex-col items-center justify-between relative">
      
      <div className="flex bg-black/10 p-1 rounded-xl mt-4">
        <button className="bg-[#ffff00] text-black px-6 py-1.5 rounded-lg font-bold text-[10px] shadow-md uppercase">SOLO</button>
        <button className="text-white/50 px-6 py-1.5 font-bold text-[10px] uppercase">SQUAD</button>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-[#6366f1] rounded-3xl flex items-center justify-center shadow-2xl mb-4 border-4 border-white/10">
          <span className="text-5xl">🐵</span>
        </div>
        <h2 className="text-5xl font-black text-white mb-2 italic">Monkey</h2>
        <p className="text-white/80 font-bold text-sm max-w-[180px] leading-tight">Make new friends face-to-face</p>
      </div>

      <div className="w-full">
        <GenderTrigger 
          selectedGender={selectedGender} 
          onClick={onOpenGender} 
        />

        <button 
          onClick={onStart}
          className="w-full py-5 bg-[#ffff00] text-black font-black text-xl rounded-2xl shadow-xl hover:brightness-105 active:scale-95 transition-all uppercase italic"
        >
          Start Video Chat
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;