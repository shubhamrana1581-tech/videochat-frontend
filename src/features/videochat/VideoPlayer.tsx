import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hook';
import { setSearching, resetVideoState } from './videoSlice';

const VideoPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.video);

  // Refs for the video elements
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 1. Get user media (Camera & Mic)
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        // In a real app, you'd store this stream in a Ref or Context 
        // to pass it to the WebRTC hook later.
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };

    getMedia();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 p-4">
      {/* Video Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Local Video (You) */}
        <div className="relative bg-black rounded-xl overflow-hidden border-2 border-blue-500">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover mirror"
          />
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded">
            You
          </div>
        </div>

        {/* Remote Video (Stranger) */}
        <div className="relative bg-black rounded-xl overflow-hidden border-2 border-gray-700">
          {status === 'searching' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-white font-medium animate-pulse">Finding a stranger...</p>
            </div>
          )}
          
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          {status === 'connected' && (
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded">
              Stranger
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="h-24 flex items-center justify-center gap-6">
        {status === 'idle' ? (
          <button
            onClick={() => dispatch(setSearching())}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition"
          >
            Start Chatting
          </button>
        ) : (
          <button
            onClick={() => dispatch(resetVideoState())}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition"
          >
            Next / Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;