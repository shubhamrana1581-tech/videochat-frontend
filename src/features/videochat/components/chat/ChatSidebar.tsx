import React, { useState } from 'react';
import ChatTabs from './ChatTabs';
import MessageList from './MessageList';
import SidebarInput from './SidebarInput';

interface ChatSidebarProps {
  messages: any[];
  onSendMessage: (text: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ messages, onSendMessage }) => {
  const [activeTab, setActiveTab] = useState<'stranger' | 'friends'>('stranger');

  return (
    <div className="w-full h-full bg-[#6366f1] rounded-[2rem] overflow-hidden flex flex-col border-4 border-white/10 shadow-2xl">
      {/* 1. Tabs */}
      <ChatTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* 2. Message Area */}
      <div className="flex-1 bg-[#4f46e5]/50 relative flex flex-col">
        {activeTab === 'stranger' ? (
          <MessageList messages={messages} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/30">
            <p className="uppercase font-black text-xs">Friends list empty</p>
          </div>
        )}
      </div>

      {/* 3. Input Area */}
      <SidebarInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatSidebar;