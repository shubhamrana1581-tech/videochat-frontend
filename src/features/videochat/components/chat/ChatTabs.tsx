import React from 'react';

interface ChatTabsProps {
  activeTab: 'stranger' | 'friends';
  onTabChange: (tab: 'stranger' | 'friends') => void;
}

const ChatTabs: React.FC<ChatTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex w-full h-14 bg-white/5 p-1 gap-1 shrink-0">
      <button
        onClick={() => onTabChange('stranger')}
        className={`flex-1 rounded-lg flex items-center justify-center transition-all ${
          activeTab === 'stranger' 
            ? 'bg-[#6366f1] text-white shadow-lg' 
            : 'text-white/30 hover:bg-white/5'
        }`}
      >
        <span className="font-black text-xs bg-[#ffff00] text-black w-6 h-6 rounded-full flex items-center justify-center">S</span>
      </button>

      <button
        onClick={() => onTabChange('friends')}
        className={`flex-1 rounded-lg flex items-center justify-center transition-all ${
          activeTab === 'friends' 
            ? 'bg-[#6366f1] text-white shadow-lg' 
            : 'text-white/30 hover:bg-white/5'
        }`}
      >
        <div className="w-6 h-6 rounded-full border-2 border-white/20 flex items-center justify-center">
          <span className="font-bold text-[8px]">O</span>
        </div>
      </button>
    </div>
  );
};

export default ChatTabs;