import React, { useState } from 'react';
import { Gift, Send } from 'lucide-react';

interface SidebarInputProps {
  onSendMessage: (text: string) => void;
}

const SidebarInput: React.FC<SidebarInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="h-16 bg-white/5 shrink-0 flex items-center px-4 gap-3 border-t border-white/5">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Send Message"
        className="flex-1 bg-transparent text-white text-sm font-medium placeholder:text-white/30 outline-none"
      />
      
      {text.trim() ? (
        <button 
          onClick={handleSend}
          className="w-10 h-10 bg-[#ffff00] rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform"
        >
          <Send size={18} />
        </button>
      ) : (
        <button className="w-10 h-10 bg-[#ffff00] rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform shadow-[0_0_15px_#ffff00]">
          <Gift size={20} />
        </button>
      )}
    </div>
  );
};

export default SidebarInput;