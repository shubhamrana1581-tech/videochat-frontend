import React from 'react';
import { motion } from 'framer-motion';
import { X, Search, MessageSquare, Trash2 } from 'lucide-react';

interface Props {
  onClose: () => void;
}

// Mock data for your recent matches
const RECENT_CHATS = [
  { id: 1, name: 'Alex', time: '2m ago', lastMsg: 'Hey, nice meeting you!', avatar: 'A', color: 'bg-blue-500' },
  { id: 2, name: 'Jordan', time: '1h ago', lastMsg: 'That was a fun chat lol', avatar: 'J', color: 'bg-purple-500' },
  { id: 3, name: 'Taylor', time: 'Yesterday', lastMsg: 'See ya!', avatar: 'T', color: 'bg-pink-500' },
];

const MessageModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 1. Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* 2. Modal Content */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-[#161427] border border-white/5 rounded-[2.5rem] flex flex-col h-[600px] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white italic tracking-tighter">MESSAGES</h2>
            <button onClick={onClose} className="p-2 text-white/20 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-purple-400 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search chats..."
              className="w-full bg-black/20 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-purple-500/50 transition-all"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-8 custom-scrollbar">
          {RECENT_CHATS.length > 0 ? (
            RECENT_CHATS.map((chat) => (
              <button 
                key={chat.id}
                className="w-full flex items-center gap-4 p-4 rounded-3xl hover:bg-white/5 transition-all group active:scale-[0.98]"
              >
                {/* Avatar */}
                <div className={`w-12 h-12 ${chat.color} rounded-2xl flex items-center justify-center text-black font-black text-lg shadow-lg`}>
                  {chat.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-white text-sm">{chat.name}</span>
                    <span className="text-[10px] font-medium text-white/20 uppercase tracking-wider">{chat.time}</span>
                  </div>
                  <p className="text-xs text-white/40 line-clamp-1">{chat.lastMsg}</p>
                </div>

                {/* Hover Action */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                   <Trash2 size={14} className="text-red-500/40 hover:text-red-500" />
                </div>
              </button>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-20">
              <MessageSquare size={48} className="mb-4" />
              <p className="text-sm font-bold uppercase tracking-widest">No Messages Yet</p>
            </div>
          )}
        </div>

        {/* Footer Link */}
        <div className="p-6 border-t border-white/5 bg-black/20">
          <button className="w-full py-4 bg-white text-black font-black rounded-2xl text-xs uppercase tracking-widest hover:brightness-90 transition-all">
            See All Friends
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MessageModal;