import React from 'react';

interface SocialProps {
  icon: React.ReactNode;
  provider: string;
  onClick: () => void;
  className: string;
}

const SocialAuthButton: React.FC<SocialProps> = ({ icon, provider, onClick, className }) => (
  <button
    onClick={onClick}
    className={`w-full py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-4 transition-all active:scale-95 shadow-lg ${className}`}
  >
    {icon}
    <span className="uppercase tracking-tight">Continue with {provider}</span>
  </button>
);

export default SocialAuthButton;