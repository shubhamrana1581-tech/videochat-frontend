import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GiftAnimationProps {
  emoji: string;
  id: string; // Unique ID for each animation instance
  onComplete: (id: string) => void;
}

const GiftAnimation: React.FC<GiftAnimationProps> = ({ emoji, id, onComplete }) => {
  const [position] = useState({
    x: Math.random() * 80 - 40, // Random X offset from center
    y: Math.random() * 80 - 40, // Random Y offset from center
    scale: 0.8 + Math.random() * 0.4 // Random scale for variety
  });

  useEffect(() => {
    const timer = setTimeout(() => onComplete(id), 2000); // Animation lasts 2 seconds
    return () => clearTimeout(timer);
  }, [id, onComplete]);

  return (
    <motion.div
      className="absolute text-6xl pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${position.scale})`
      }}
      initial={{ opacity: 0, scale: 0.5, y: 0 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1.2, 1.5], y: [-50, -100, -150, -200] }}
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      {emoji}
    </motion.div>
  );
};

export default GiftAnimation;