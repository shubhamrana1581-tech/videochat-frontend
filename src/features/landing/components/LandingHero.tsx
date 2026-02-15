import React from 'react';
import { Video } from 'lucide-react';

const LandingHero = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center pt-20">
      {/* Main Heading */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
        <span className="block text-white drop-shadow-lg">Talk to strangers.</span>
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 animate-gradient">
          Make new friends.
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg mx-auto font-light tracking-wide">
        Random video chat with people around the world. Fast, fun, and free.
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold text-lg shadow-lg shadow-pink-500/30 transform transition-all duration-300 hover:scale-105 hover:shadow-pink-500/50">
          <span className="flex items-center justify-center gap-2">
            Start Chatting <Video className="w-5 h-5 group-hover:animate-pulse" />
          </span>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>

        <button className="px-8 py-4 rounded-full border border-gray-600 text-white font-semibold text-lg hover:bg-white/5 hover:border-white transition-all duration-300">
          Login
        </button>
      </div>
    </main>
  );
};

export default LandingHero;