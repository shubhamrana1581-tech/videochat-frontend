import React from 'react';
import { Plus, Zap } from 'lucide-react';

interface UserCardProps {
  name: string;
  isOnline: boolean;
  isPro?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ name, isOnline, isPro }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group cursor-pointer">
      <div className="flex items-center gap-3">
        {/* Avatar with Status Dot */}
        <div className="relative">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
            {name.charAt(0)}
          </div>
          {isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#1e1b4b] rounded-full shadow-sm" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-sm text-white/90">{name}</h4>
            {isPro && <Zap size={12} className="text-yellow-400 fill-yellow-400" />}
          </div>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">
            {isOnline ? 'Active Now' : 'Recently Active'}
          </p>
        </div>
      </div>

      <button className="p-2 bg-yellow-400 text-black rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg shadow-yellow-400/10">
        <Plus size={18} strokeWidth={3} />
      </button>
    </div>
  );
};

export default UserCard;