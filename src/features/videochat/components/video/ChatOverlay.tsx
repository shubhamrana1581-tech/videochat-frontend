import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'stranger';
}

const ChatOverlay: React.FC<{ messages: Message[] }> = ({ messages }) => {
  return (
    <div className="absolute bottom-24 left-6 right-24 max-h-[200px] overflow-hidden flex flex-col justify-end gap-2 z-20 pointer-events-none">
      <AnimatePresence initial={false}>
        {messages.slice(-4).map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm font-black shadow-xl backdrop-blur-md border ${
              msg.sender === 'me' 
                ? 'bg-[#6366f1] text-white self-start border-white/20 rounded-bl-none' 
                : 'bg-white text-black self-start border-black/5 rounded-bl-none'
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ChatOverlay;