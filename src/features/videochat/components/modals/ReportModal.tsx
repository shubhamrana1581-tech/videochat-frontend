import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';

interface ReportModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const REPORT_REASONS = [
  "Inappropriate Content",
  "Bullying or Harassment",
  "I'm just not interested",
  "Underage User",
  "Spam / Bot"
];

const ReportModal: React.FC<ReportModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-sm bg-[#1c1a2e] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-500 mb-6">
            <ShieldAlert size={32} />
          </div>
          
          <h2 className="text-xl font-black text-white italic uppercase tracking-tight mb-2">Report User?</h2>
          <p className="text-white/40 text-xs font-medium mb-8">Help us keep Monkey safe. Why are you reporting this person?</p>
          
          <div className="w-full space-y-2 mb-8">
            {REPORT_REASONS.map((reason) => (
              <button 
                key={reason}
                onClick={onConfirm}
                className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-white/80 text-xs font-bold transition-all text-left"
              >
                {reason}
              </button>
            ))}
          </div>

          <button 
            onClick={onClose}
            className="text-white/20 hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportModal;