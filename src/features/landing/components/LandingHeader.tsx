import React from 'react';
import { Menu } from 'lucide-react';

interface LandingHeaderProps {
  onOpenSidebar: () => void;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ onOpenSidebar }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-gray-900/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600">
          Monkey
        </span>
      </div>
      
      <button 
        onClick={onOpenSidebar}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <Menu className="w-8 h-8 text-white" />
      </button>
    </header>
  );
};

export default LandingHeader;