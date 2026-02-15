import React from 'react';
import { Search, Crown, Clock, MessageCircle, Users, Shield } from 'lucide-react';
import GlobalMatchCount from './video/GlobalMatchCount'; // Segregated component

interface NavbarProps {
  onOpenModal: (modalName: string) => void;
  activeModal: string | null;
}

const DashboardNavbar: React.FC<NavbarProps> = ({ onOpenModal, activeModal }) => {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 bg-[#0a0817] border-b border-white/5 z-50 shrink-0">
      
      {/* LEFT SIDE: Safety & Live Counter */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onOpenModal('safety')}
          className="bg-[#22c55e] text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#1eb054] transition-all"
        >
          <Shield size={14} fill="currentColor" />
          Safety Center
        </button>

        {/* The Live Online Counter we created */}
        <GlobalMatchCount />
      </div>

      {/* RIGHT SIDE: Navigation Icons from your code */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => onOpenModal('search')} 
          className={`p-2 transition-colors ${activeModal === 'search' ? 'text-white' : 'text-white/50 hover:text-white'}`}
        >
          <Search size={20} strokeWidth={2.5} />
        </button>

        <button 
          onClick={() => onOpenModal('plus')} 
          className={`p-2 transition-colors ${activeModal === 'plus' ? 'text-[#fbbf24]' : 'text-[#fbbf24]/70 hover:text-[#fbbf24]'}`}
        >
          <Crown size={20} strokeWidth={2.5} />
        </button>

        <button 
          onClick={() => onOpenModal('history')} 
          className={`p-2 transition-colors ${activeModal === 'history' ? 'text-white' : 'text-white/50 hover:text-white'}`}
        >
          <Clock size={20} strokeWidth={2.5} />
        </button>

        <button 
          onClick={() => onOpenModal('messages')} 
          className={`p-2 transition-colors ${activeModal === 'messages' ? 'text-white' : 'text-white/50 hover:text-white'}`}
        >
          <MessageCircle size={20} strokeWidth={2.5} />
        </button>

        <button 
          onClick={() => onOpenModal('recommended')} 
          className={`p-2 transition-colors ${activeModal === 'recommended' ? 'text-white' : 'text-white/50 hover:text-white'}`}
        >
          <Users size={20} strokeWidth={2.5} />
        </button>

        {/* Profile Avatar */}
        <div 
          onClick={() => onOpenModal('profile')}
          className="w-9 h-9 bg-[#60a5fa] rounded-full flex items-center justify-center text-black font-black text-xs cursor-pointer hover:scale-105 transition-transform border-2 border-transparent hover:border-white/20"
        >
          S
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;