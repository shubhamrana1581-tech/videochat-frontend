import React from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import this
import ModalLayout from './ModalLayout';

const ProfileModal = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear any local storage or session data
    localStorage.removeItem('user_token'); // Or whatever key you use
    
    // 2. Optional: Add a small delay for a smoother feel
    onClose();
    
    // 3. Redirect to the landing page
    navigate('/'); 
  };

  return (
    <ModalLayout title="My Profile" onClose={onClose} position="right"
    >
      <div className="flex flex-col items-center text-center">
        {/* Profile Avatar Area */}
        <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-yellow-400 to-pink-500 p-1 mb-4">
          <div className="w-full h-full bg-gray-900 rounded-[1.8rem] flex items-center justify-center">
             <User size={40} className="text-white/20" />
          </div>
        </div>
        
        <h2 className="text-2xl font-black text-white mb-1">Monkey User</h2>
        <p className="text-sm text-white/40 mb-8">@user_8829</p>

        {/* Stats Section */}
        <div className="grid grid-cols-3 w-full gap-2 mb-8">
          <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
            <p className="text-[9px] uppercase font-black text-white/30">Friends</p>
            <p className="text-lg font-black text-yellow-400">24</p>
          </div>
          <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
            <p className="text-[9px] uppercase font-black text-white/30">Stars</p>
            <p className="text-lg font-black text-yellow-400">4.8</p>
          </div>
          <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
            <p className="text-[9px] uppercase font-black text-white/30">Chats</p>
            <p className="text-lg font-black text-yellow-400">152</p>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full space-y-3">
          <button className="w-full py-4 bg-white/5 rounded-2xl font-bold text-white hover:bg-white/10 flex items-center justify-center gap-3">
            <Settings size={20} /> Settings
          </button>
          
          {/* LOGOUT BUTTON */}
          <button 
            onClick={handleLogout}
            className="w-full py-4 bg-red-500/10 text-red-500 rounded-2xl font-bold hover:bg-red-500/20 flex items-center justify-center gap-3 transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ProfileModal;