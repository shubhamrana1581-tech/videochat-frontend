import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="absolute bottom-6 left-6 right-24 z-30"
    >
      <div className="relative group">
        <input 
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="w-full bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ffff00]/50 transition-all shadow-2xl"
        />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#ffff00] text-black rounded-xl hover:scale-105 active:scale-95 transition-all"
        >
          <Send size={18} strokeWidth={3} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;