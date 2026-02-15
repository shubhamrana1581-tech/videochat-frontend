import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  currentGender: string;
  onSave: (gender: string) => void;
}

const GenderModal: React.FC<Props> = ({ onClose, currentGender, onSave }) => {
  const [selected, setSelected] = useState(currentGender);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-[400px] bg-white rounded-[2rem] overflow-hidden shadow-2xl text-black"
      >
        {/* Header Banner */}
        <div className="bg-[#f5f3ff] p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👑</span>
            <div>
              <h3 className="font-bold text-sm leading-tight">Monkey Plus</h3>
              <p className="text-[10px] text-gray-400">Get More Gender Filters</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#ffff00] px-4 py-1.5 rounded-full font-bold text-xs shadow-sm hover:scale-105 transition-transform">
              Join
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-black">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-lg">🕹️</span>
            <h2 className="font-bold text-lg text-gray-800">Gender</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'girls', label: 'Girls Only', icon: '👱‍♀️' },
              { id: 'guys', label: 'Guys Only', icon: '👱' },
              { id: 'both', label: 'Both', icon: '👫' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                  selected === opt.id 
                    ? 'border-[#6366f1] bg-[#f5f3ff]' 
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <span className="text-2xl">{opt.icon}</span>
                <span className={`text-[11px] font-bold ${selected === opt.id ? 'text-[#6366f1]' : 'text-gray-400'}`}>
                  {opt.label}
                </span>
              </button>
            ))}
          </div>

          <button 
            onClick={() => { onSave(selected); onClose(); }}
            className="w-full mt-8 py-4 bg-[#6366f1] text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:brightness-110 active:scale-95 transition-all"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default GenderModal;