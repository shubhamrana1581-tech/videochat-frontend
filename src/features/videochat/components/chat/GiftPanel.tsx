import React from 'react';
import { motion } from 'framer-motion';

interface GiftPanelProps {
  onSendGift: (emoji: string) => void;
  onClose: () => void;
}

const GIFTS = ['❤️', '😂', '🔥', '🎉', '👋', '😎', '💯', '✨', '🤩', '🥳', '🚀', '💎'];

const GiftPanel: React.FC<GiftPanelProps> = ({ onSendGift, onClose }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 10 }}
      className="absolute bottom-20 right-4 z-50 p-3 bg-black/80 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl w-56"
    >
      <div className="grid grid-cols-4 gap-2">
        {GIFTS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onSendGift(emoji)}
            className="w-10 h-10 flex items-center justify-center text-xl hover:bg-white/10 rounded-full transition-all active:scale-90"
          >
            {emoji}
          </button>
        ))}
      </div>
      <div className="mt-2 pt-2 border-t border-white/5 flex justify-center">
        <button onClick={onClose} className="text-[10px] text-white/40 font-black uppercase tracking-widest hover:text-white">Close</button>
      </div>
    </motion.div>
  );
};

export default GiftPanel;