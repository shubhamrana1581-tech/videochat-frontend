import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook'; // Your typed hooks
import { setSearching,setDisconnected, setConnected} from './videoSlice';
import { socket } from '../../services/socket';
import { useWebRTC } from '../../hooks/useWebRTC';

const VideoContainer = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state:any) => state.videochat);
  
  // Refs for the video elements
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Keep streams in local state/refs, NOT Redux
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
// Inside VideoContainer.tsx

const [localStream, setLocalStream] = useState<MediaStream | null>(null);

// Callback to update the remote video ref
const handleRemoteStream = (stream: MediaStream) => {
  if (remoteVideoRef.current) {
    remoteVideoRef.current.srcObject = stream;
  }
};

// Initialize the hook
const { startCall } = useWebRTC(localStream, handleRemoteStream);

// Listen for backend signal to start
useEffect(() => {
  socket.on('start-call', () => {
    startCall(); // If backend says "you start", we call this
  });
}, [startCall]);
  // 1. Initialize Local Stream (Camera)
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };
    startCamera();

    // Cleanup on unmount
    return () => {
      localStreamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  // 2. Handle "Next" / Start Search
  const handleNext = () => {
    dispatch(setSearching());
    
    // Close existing connection if any
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    
    // Tell backend we want a match
    socket.connect();
    socket.emit('join-queue');
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-900 p-4">
      {/* Video Grid */}
      <div className="flex w-full max-w-4xl gap-4 mb-4 h-[60vh]">
        
        {/* Local Video (You) */}
        <div className="flex-1 bg-black rounded-lg overflow-hidden relative border-2 border-gray-700">
          <video 
            ref={localVideoRef} 
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
          />
          <span className="absolute bottom-2 left-2 text-white bg-black/50 px-2 rounded">You</span>
        </div>

        {/* Remote Video (Stranger) */}
        <div className="flex-1 bg-black rounded-lg overflow-hidden relative border-2 border-gray-700">
          {status === 'searching' ? (
            <div className="flex items-center justify-center h-full text-white animate-pulse">
              Searching for a stranger...
            </div>
          ) : (
            <video 
              ref={remoteVideoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover" 
            />
          )}
          <span className="absolute bottom-2 left-2 text-white bg-black/50 px-2 rounded">Stranger</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button 
          onClick={handleNext}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full text-xl shadow-lg transition"
        >
          {status === 'idle' ? 'Start' : 'Next Person ->'}
        </button>
      </div>
    </div>
  );
};

export default VideoContainer;