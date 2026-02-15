import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Users, X } from 'lucide-react';

const InviteModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const inviteUrl = `monkey-clone.app/join/${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative bg-[#7c3aed] border-4 border-white/10 rounded-[3rem] p-10 max-w-sm w-full shadow-2xl text-center"
      >
        <div className="w-20 h-20 bg-[#ffff00] rounded-3xl flex items-center justify-center text-black mx-auto mb-6 shadow-xl rotate-3">
          <Users size={40} />
        </div>
        <h2 className="text-3xl font-black text-white italic uppercase mb-2">Squad Up!</h2>
        <p className="text-white/70 text-sm font-bold mb-8">Share this link to video chat with your friends in your squad.</p>
        
        <div className="bg-black/20 p-4 rounded-2xl flex items-center gap-3 mb-8 border border-white/5">
          <input readOnly value={inviteUrl} className="bg-transparent text-white/50 text-xs flex-1 outline-none font-mono" />
          <button onClick={() => navigator.clipboard.writeText(inviteUrl)} className="text-[#ffff00] hover:scale-110 transition-transform">
            <Copy size={18} />
          </button>
        </div>

        <button onClick={onClose} className="w-full py-4 bg-white text-[#7c3aed] font-black rounded-2xl uppercase italic tracking-widest hover:bg-[#ffff00] hover:text-black transition-all">
          Done
        </button>
      </motion.div>
    </div>
  );
};

export default InviteModal;