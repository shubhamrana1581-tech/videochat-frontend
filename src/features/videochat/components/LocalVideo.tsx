import React, { useRef, useEffect } from 'react';

interface Props {
  stream: MediaStream | null;
}

const LocalVideo: React.FC<Props> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative w-full h-full bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-white/10 group">
      <video 
        ref={videoRef} 
        autoPlay 
        muted 
        playsInline 
        className="w-full h-full object-cover scale-x-[-1]" 
      />
      <div className="absolute bottom-6 right-6 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
        <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">You</span>
      </div>
    </div>
  );
};

export default LocalVideo;