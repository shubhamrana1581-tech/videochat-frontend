import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import ModalLayout from './ModalLayout';

const SafetyModal = ({ onClose }: { onClose: () => void }) => {
  const [requestsDisabled, setRequestsDisabled] = useState(false);
  const [invisibleMode, setInvisibleMode] = useState(true);

  return (
    <ModalLayout title="Safety Center" onClose={onClose} position="left">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck size={32} />
        </div>
        <p className="text-sm text-center text-white/60 px-4">
          Control your privacy settings and who can interact with you.
        </p>
      </div>

      <div className="space-y-6">
        <SafetyToggle 
          title="Disable friend requests" 
          desc="Turn this on to stop receiving friend requests" 
          isActive={requestsDisabled}
          onToggle={() => setRequestsDisabled(!requestsDisabled)}
        />
        
        <SafetyToggle 
          title="Invisible mode" 
          desc="Once enabled, the other person won't see your identity" 
          isActive={invisibleMode}
          onToggle={() => setInvisibleMode(!invisibleMode)}
        />
      </div>

      <div className="mt-8 pt-6 border-t border-white/5">
        <button className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
          <AlertTriangle size={18} /> Report a Safety Issue
        </button>
      </div>
    </ModalLayout>
  );
};

// Internal Helper for Toggles
const SafetyToggle = ({ title, desc, isActive, onToggle }: any) => (
  <div className="flex items-center justify-between gap-6 group">
    <div className="flex-1">
      <h4 className="font-bold text-white group-hover:text-yellow-400 transition-colors">{title}</h4>
      <p className="text-[11px] text-white/40 font-medium leading-relaxed">{desc}</p>
    </div>
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full relative transition-all duration-300 ${isActive ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-white/10'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isActive ? 'left-7' : 'left-1'}`} />
    </button>
  </div>
);

export default SafetyModal;