import React from 'react';
import { Send, UserPlus, History } from 'lucide-react';
import ModalLayout from './ModalLayout';

const HistoryModal = ({ onClose }: { onClose: () => void }) => {
  const recentStrangers = [
    { id: 1, name: 'Urban_King', time: '2m ago', color: 'bg-blue-500' },
    { id: 2, name: 'CyberGirl_x', time: '15m ago', color: 'bg-purple-500' },
    { id: 3, name: 'FlowState', time: '40m ago', color: 'bg-pink-500' },
  ];

  return (
    <ModalLayout title="Recently Met" onClose={onClose} position="right">
      <div className="flex items-center gap-2 mb-6 text-yellow-400">
        <History size={16} />
        <span className="text-[10px] font-black uppercase tracking-widest">Last 24 Hours</span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {recentStrangers.map((stranger) => (
          <div 
            key={stranger.id} 
            className="flex items-center justify-between bg-white/5 p-4 rounded-3xl border border-white/5 hover:border-white/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl ${stranger.color} shadow-lg flex items-center justify-center font-black text-xl`}>
                {stranger.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white">{stranger.name}</p>
                <p className="text-[10px] text-white/30 font-black uppercase">{stranger.time}</p>
              </div>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button title="Send Message" className="p-2.5 bg-white/10 rounded-xl text-white hover:bg-yellow-400 hover:text-black transition-all">
                <Send size={18} />
              </button>
              <button title="Add Friend" className="p-2.5 bg-white/10 rounded-xl text-white hover:bg-green-500 transition-all">
                <UserPlus size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {recentStrangers.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-white/20 font-bold italic">No recent chats yet...</p>
        </div>
      )}
    </ModalLayout>
  );
};

export default HistoryModal;