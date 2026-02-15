import React from 'react';
import ModalLayout from './ModalLayout';
import UserCard from './UserCard';
import { Users } from 'lucide-react';

const RecommendedModal = ({ onClose }: { onClose: () => void }) => {
  const recommendations = [
    { name: 'HyperNexus', online: true, pro: true },
    { name: 'Luna_Vibe', online: true, pro: false },
    { name: 'PixelDrip', online: false, pro: false },
    { name: 'Ghost_Mode', online: true, pro: true },
    { name: 'ZenithX', online: true, pro: false },
  ];

  return (
    <ModalLayout title="Recommended" onClose={onClose} position="right">
      <div className="flex items-center gap-2 mb-5 px-1">
        <Users size={16} className="text-purple-400" />
        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Suggested for you</span>
      </div>

      <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
        {recommendations.map((user, idx) => (
          <UserCard 
            key={idx} 
            name={user.name} 
            isOnline={user.online} 
            isPro={user.pro} 
          />
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-white/5">
        <button className="w-full py-3 text-xs font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors">
          View More Suggestions
        </button>
      </div>
    </ModalLayout>
  );
};

export default RecommendedModal;