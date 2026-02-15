import React from 'react';
import { Crown, Check } from 'lucide-react';
import ModalLayout from './ModalLayout';

const PlusModal = ({ onClose }: { onClose: () => void }) => (
  <ModalLayout title="Monkey Plus" onClose={onClose} maxWidth="max-w-lg" position="right">
    <div className="text-center mb-8">
      <div className="inline-block p-4 bg-yellow-400 rounded-3xl mb-4 shadow-lg shadow-yellow-400/20">
        <Crown size={40} className="text-black" />
      </div>
      <h2 className="text-2xl font-black text-white">Unlock Everything</h2>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center">
        <span className="text-white/40 text-xs font-bold uppercase mb-1">Weekly</span>
        <span className="text-2xl font-black text-white">$6.99</span>
      </div>
      <div className="p-4 rounded-3xl bg-yellow-400 text-black flex flex-col items-center relative">
        <span className="absolute -top-3 bg-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Popular</span>
        <span className="text-black/60 text-xs font-bold uppercase mb-1">Monthly</span>
        <span className="text-2xl font-black">$19.99</span>
      </div>
    </div>

    <ul className="space-y-3 mb-8 px-4">
      {['Gender & Location Filters', 'Remove All Ads', 'Exclusive Profile Badge', 'Priority Matching'].map((feat) => (
        <li key={feat} className="flex items-center gap-3 text-sm font-bold text-white/80">
          <Check size={16} className="text-green-400" /> {feat}
        </li>
      ))}
    </ul>
    
    <button className="w-full py-4 bg-yellow-400 text-black rounded-2xl font-black text-lg hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all">
      UPGRADE NOW
    </button>
  </ModalLayout>
);

export default PlusModal;