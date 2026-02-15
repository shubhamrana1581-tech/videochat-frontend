import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'stranger';
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-white/20">
          <p className="text-xs uppercase font-black tracking-widest">No messages yet</p>
          <p className="text-[10px]">Say hi!</p>
        </div>
      )}

      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm font-bold ${
              msg.sender === 'me'
                ? 'bg-[#ffff00] text-black rounded-tr-none'
                : 'bg-white text-black rounded-tl-none'
            }`}
          >
            {msg.text}
          </div>
        </motion.div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;