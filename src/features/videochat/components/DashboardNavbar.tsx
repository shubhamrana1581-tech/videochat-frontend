import React from 'react';
import { Search, Crown, Clock, MessageCircle, Users } from 'lucide-react';

interface NavbarProps {
  onOpenModal: (modalName: string) => void;
  activeModal: string | null;
}

const DashboardNavbar: React.FC<NavbarProps> = ({ onOpenModal, activeModal }) => {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 bg-[#0a0817] border-b border-white/5 z-50 shrink-0">
      
      <div className="flex items-center">
        <button 
          onClick={() => onOpenModal('safety')}
          className="bg-[#22c55e] text-black text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full"
        >
          Center
        </button>
      </div>

      <div className="flex items-center gap-6">
        <button onClick={() => onOpenModal('search')} className="p-2 text-white/50 hover:text-white transition-colors">
          <Search size={20} strokeWidth={2.5} />
        </button>

        <button onClick={() => onOpenModal('plus')} className="p-2 text-[#fbbf24] hover:text-[#fcd34d] transition-colors">
          <Crown size={20} strokeWidth={2.5} />
        </button>

        <button onClick={() => onOpenModal('history')} className="p-2 text-white/50 hover:text-white transition-colors">
          <Clock size={20} strokeWidth={2.5} />
        </button>

        <button onClick={() => onOpenModal('messages')} className="p-2 text-white/50 hover:text-white transition-colors">
          <MessageCircle size={20} strokeWidth={2.5} />
        </button>

        <button onClick={() => onOpenModal('recommended')} className="p-2 text-white/50 hover:text-white transition-colors">
          <Users size={20} strokeWidth={2.5} />
        </button>

        <div 
          onClick={() => onOpenModal('profile')}
          className="w-9 h-9 bg-[#60a5fa] rounded-full flex items-center justify-center text-black font-black text-xs cursor-pointer"
        >
          S
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;