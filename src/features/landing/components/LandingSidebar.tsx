import React from 'react';
import { X, Globe, User, Video, Lock } from 'lucide-react';

interface LandingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const LandingSidebar: React.FC<LandingSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside 
        className={`fixed top-0 right-0 h-full w-[300px] bg-gray-800 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <span className="text-xl font-bold text-white">Menu</span>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <SidebarItem icon={<Globe size={20} />} text="Home" />
          <SidebarItem icon={<User size={20} />} text="About Us" />
          <SidebarItem icon={<Video size={20} />} text="How It Works" />
          <div className="h-px bg-gray-700 my-4 mx-2"></div>
          <SidebarItem icon={<Lock size={20} />} text="Login" />
          <SidebarItem icon={<User size={20} />} text="Sign Up" />
        </nav>

        <div className="p-6 border-t border-gray-700 text-center">
          <p className="text-gray-500 text-sm">© 2026 Monkey Clone</p>
        </div>
      </aside>
    </>
  );
};

// Helper Component (Internal to Sidebar)
const SidebarItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <a href="#" className="flex items-center gap-4 px-4 py-3 text-gray-300 rounded-xl hover:bg-gray-700 hover:text-white transition-all duration-200 group">
    <span className="group-hover:text-pink-500 transition-colors">{icon}</span>
    <span className="font-medium tracking-wide">{text}</span>
  </a>
);

export default LandingSidebar;