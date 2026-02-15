import React from 'react';
import { Chrome, Apple, Facebook } from 'lucide-react';
import SocialAuthButton from './SocialAuthButton';
import { useNavigate } from 'react-router-dom';
import OnlineCounter from './OnlineCounter';

const AuthSection = () => {
  const navigate = useNavigate();
  const handleLogin = () => navigate('/dashboard');

  return (
    <div className="flex-1 flex flex-col justify-between p-8 md:p-14 lg:p-20 z-10 h-full max-h-screen">
      
      {/* --- 1. TOP: Branding --- */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/20">
          <span className="text-2xl">🐵</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Platform</span>
          <span className="text-xl font-black tracking-tighter uppercase">Monkey</span>
        </div>
      </div>

      {/* --- 2. MIDDLE: Hero & Auth --- */}
      <div className="flex flex-col justify-center flex-grow py-10">
        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tighter leading-[0.9] mb-6 animate-in slide-in-from-left duration-700">
          Make new <br /> friends <br /> 
          <span className="text-purple-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">face-to-face.</span>
        </h1>
        
        <p className="text-white/40 text-lg md:text-xl mb-10 max-w-sm font-medium leading-relaxed">
          The best place to chat with cool people from all over the world.
        </p>

        {/* Buttons Container with better spacing */}
        <div className="w-full max-w-[340px] space-y-4">
          <SocialAuthButton 
            provider="Google" 
            icon={<Chrome size={20} />} 
            onClick={handleLogin}
            className="bg-white text-black hover:ring-4 hover:ring-white/10"
          />
          <SocialAuthButton 
            provider="Apple" 
            icon={<Apple size={20} fill="white" />} 
            onClick={handleLogin}
            className="bg-black text-white hover:ring-4 hover:ring-white/10 border border-white/10"
          />
          <SocialAuthButton 
            provider="Facebook" 
            icon={<Facebook size={20} fill="white" />} 
            onClick={handleLogin}
            className="bg-[#1877F2] text-white hover:ring-4 hover:ring-blue-500/20"
          />
          
          <p className="text-[11px] text-white/20 text-center mt-8 uppercase font-bold tracking-[0.1em] leading-relaxed">
            By continuing, you agree to our <br />
            <span className="text-white/40 hover:text-white cursor-pointer underline underline-offset-4 transition-colors">Terms</span> & <span className="text-white/40 hover:text-white cursor-pointer underline underline-offset-4 transition-colors">Privacy</span>
          </p>
        </div>
      </div>

      {/* --- 3. BOTTOM: Live Stats --- */}
      <div className="shrink-0 pt-8 border-t border-white/5">
        <OnlineCounter />
      </div>
    </div>
  );
};

export default AuthSection;