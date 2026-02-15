import React from 'react';
import { X } from 'lucide-react';

interface ModalLayoutProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  // Added a new prop to control if it aligns left (Safety) or right (Icons)
  position?: "left" | "right";
}

const ModalLayout: React.FC<ModalLayoutProps> = ({ 
  title, 
  onClose, 
  children, 
  maxWidth = "max-w-[380px]", 
  position = "right" 
}) => (
  // Fixed inset-0 covers screen, but content is now pushed to the top right/left
  <div 
    className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm animate-in fade-in duration-200"
    onClick={onClose} // Clicking the background closes it
  >
    <div 
      className={`absolute top-20 ${position === 'left' ? 'left-6' : 'right-6'} w-full ${maxWidth} bg-[#1e1b4b]/98 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/10 animate-in slide-in-from-top-4 duration-300`}
      onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
    >
      <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/5">
        <h3 className="text-lg font-black tracking-tight text-white">{title}</h3>
        <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors">
          <X size={18}/>
        </button>
      </div>
      <div className="p-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </div>
  </div>
);

export default ModalLayout;