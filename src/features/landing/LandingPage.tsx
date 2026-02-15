import React from 'react';
import AuthSection from './components/AuthSection';
import VideoPreview from './components/VideoPreview';

const LandingPage = () => {
  return (
    // Changed min-h-screen to h-screen and added overflow-hidden
    <div className="h-screen w-full bg-[#0a0817] text-white flex flex-col lg:flex-row relative overflow-hidden">
      
      {/* Left side Content */}
      <AuthSection />

      {/* Right side Video Container */}
      <VideoPreview />

      {/* Ambient background glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
    </div>
  );
};

export default LandingPage;