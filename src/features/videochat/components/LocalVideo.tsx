import React, { useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { useCameraFlip } from '../hooks/useCameraFlip';

interface LocalVideoProps {
  stream: MediaStream | null;
  onStreamUpdate?: (stream: MediaStream) => void; // Added to handle the flip update
}

const LocalVideo: React.FC<LocalVideoProps> = ({ stream, onStreamUpdate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toggleCamera } = useCameraFlip(stream);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStreamUpdate) {
      toggleCamera(onStreamUpdate);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#12101f] flex items-center justify-center overflow-hidden group">
      {stream ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover mirror-mode"
          />
          
          {/* Flip Camera Button - Segregated UI */}
          <button
            onClick={handleFlip}
            className="absolute bottom-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-[#ffff00] hover:text-black transition-all border border-white/10 opacity-0 group-hover:opacity-100 lg:opacity-100 shadow-xl"
            title="Flip Camera"
          >
            <RefreshCw size={20} />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center opacity-20">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-white mb-2 animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-widest text-white">Camera Off</p>
        </div>
      )}
      
     {/* THE "YOU" BADGE (Matches image_f3b10a.png) */}
      <div className="absolute bottom-6 left-6">
        <div className="bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-xl">
          <span className="text-white text-[10px] font-black italic tracking-tighter uppercase">
            YOU
          </span>
        </div>
      </div>
    </div>
  );
};

export default LocalVideo;