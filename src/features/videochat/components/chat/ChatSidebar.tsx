import React, { useState } from 'react';
import { Gift, Send } from 'lucide-react';

interface ChatSidebarProps {
  messages: any[];
  onSendMessage: (text: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#7c7fff] relative">
      {/* 1. TOP TABS (The "S" and "O" circles from Screenshot 5) */}
      <div className="flex p-2 gap-1 bg-black/5">
        <button className="flex-1 h-10 bg-white/20 rounded-xl flex items-center justify-center border border-white/10">
          <div className="w-6 h-6 bg-[#ffff00] rounded-full flex items-center justify-center text-[10px] font-black text-black">S</div>
        </button>
        <button className="flex-1 h-10 bg-transparent rounded-xl flex items-center justify-center">
          <div className="w-6 h-6 border border-white/40 rounded-full flex items-center justify-center text-[10px] font-bold text-white/40">O</div>
        </button>
      </div>

      {/* 2. MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
             <p className="text-white font-black uppercase text-[10px] tracking-widest">No messages yet</p>
             <p className="text-white text-[10px]">Say hi!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`max-w-[85%] p-3 rounded-2xl text-sm font-bold ${
                msg.sender === 'me' 
                ? 'bg-[#ffff00] text-black self-end rounded-tr-none' 
                : 'bg-white/20 text-white self-start rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      {/* 3. INPUT AREA (As seen in Screenshot 2 & 4) */}
      <div className="p-4 pb-6 bg-gradient-to-t from-black/20 to-transparent">
        <div className="relative flex items-center">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Send Message"
            className="w-full bg-white/10 border border-white/10 rounded-full py-4 px-6 pr-16 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#ffff00]/50 transition-all"
          />
          
          {/* Yellow Gift Button */}
          <button className="absolute right-2 w-10 h-10 bg-[#ffff00] rounded-full flex items-center justify-center text-black shadow-lg hover:scale-110 active:scale-95 transition-all">
            <Gift size={20} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;