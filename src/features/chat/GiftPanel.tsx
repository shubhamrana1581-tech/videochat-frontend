import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GiftPanelProps {
  onSendGift: (emoji: string) => void;
  onClose: () => void;
}

const GIFTS = [
  '❤️', '😂', '🔥', '🎉', '👋', '😎', '🤙', '💯', '✨', '🤩', '🥳', '🚀'
];

const GiftPanel: React.FC<GiftPanelProps> = ({ onSendGift, onClose }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="absolute bottom-full right-0 mb-3 p-3 bg-black/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 max-w-[200px]"
    >
      <div className="grid grid-cols-4 gap-2">
        {GIFTS.map((emoji, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSendGift(emoji)}
            className="p-2 text-xl bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            {emoji}
          </motion.button>
        ))}
      </div>
      <button onClick={onClose} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500/80 text-white text-xs rounded-full flex items-center justify-center border border-white/10 hover:bg-red-600">
        ✕
      </button>
    </motion.div>
  );
};

export default GiftPanel;