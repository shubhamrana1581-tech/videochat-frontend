import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useChatTimer } from '../hooks/useChatTimer';
import ChatTimer from './video/ChatTimer';
import VideoActions from './video/VideoActions';
import ChatOverlay from './video/ChatOverlay';
import ChatInput from './video/ChatInput';
import InterestPicker from './video/InterestPicker'; // New segregated component
import ReportModal from './modals/ReportModal';
import { captureVideoFrame } from './video/CameraSnapshot';
import { playMatchSound } from './utils/sounds';

interface StrangerVideoProps {
  stream: MediaStream | null;
  status: string;
  onNext: () => void;
  onToggleTheater: () => void;
  isTheaterMode: boolean;
  selectedInterests: string[];
  onToggleInterest: (id: string) => void;
}

const StrangerVideo: React.FC<StrangerVideoProps> = ({ 
  stream, status, onNext, onToggleTheater, isTheaterMode, selectedInterests, onToggleInterest 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { timeLeft, startTimer, addTime } = useChatTimer(15, onNext);
  const [messages, setMessages] = useState<any[]>([]);
  const [isReportOpen, setIsReportOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (status === 'connected') {
      startTimer();
      setMessages([]); 
      playMatchSound(); // Trigger the segregated sound utility
    }
  }, [status, startTimer]);

  const handleSendMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), text, sender: 'me' }]);
  };

  const handleSnapshot = () => {
    if (videoRef.current) captureVideoFrame(videoRef.current);
  };

  return (
    <div className="relative w-full h-full bg-[#0a0a0c] flex items-center justify-center overflow-hidden rounded-[2rem]">
      
      {/* 1. VIDEO RENDERING */}
      {status === 'connected' && stream ? (
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          className="w-full h-full object-cover animate-in fade-in duration-500"
        />
      ) : (
        /* 2. IDLE / SEARCHING STATE (Where Interest Picker lives) */
        <div className="text-center z-10 w-full px-4">
          {status === 'searching' ? (
            <div className="flex flex-col items-center">
              <div className="text-7xl mb-4 animate-bounce">🐵</div>
              <p className="text-[#ffff00] font-black italic text-xl animate-pulse tracking-tighter">
                FINDING A MATCH...
              </p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-white font-black italic uppercase tracking-tighter text-2xl mb-1">
                What's your vibe?
              </h3>
              <p className="text-white/30 font-bold text-[10px] uppercase mb-6 tracking-widest">
                Select interests to find better matches
              </p>
              
              {/* INTEREST PICKER PLACEMENT */}
              <InterestPicker 
                selectedInterests={selectedInterests} 
                onToggleInterest={onToggleInterest} 
              />
            </motion.div>
          )}
        </div>
      )}

      {/* 3. ACTIVE CALL OVERLAYS */}
      {status === 'connected' && (
        <>
          <ChatTimer seconds={timeLeft} onAddTime={() => addTime(15)} />
          
          <VideoActions 
            onReport={() => setIsReportOpen(true)} 
            onToggleTheater={onToggleTheater}
            onSnapshot={handleSnapshot}
            isTheaterMode={isTheaterMode}
          />

          {/* Interest Tags Overlay (Top Left below timer) */}
          <div className="absolute top-24 left-6 flex flex-wrap gap-2 pointer-events-none">
            {selectedInterests.map(id => (
              <span key={id} className="bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-[9px] text-[#ffff00] font-black uppercase italic border border-white/5 shadow-lg">
                #{id}
              </span>
            ))}
          </div>

          <ChatOverlay messages={messages} />
          <ChatInput onSendMessage={handleSendMessage} />
          
          <button 
            onClick={onNext}
            className="absolute bottom-6 right-6 p-5 bg-[#ffff00] text-black rounded-full font-black shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 italic text-sm border-b-4 border-black/20"
          >
            NEXT ➔
          </button>
        </>
      )}

      {/* 4. MODALS */}
      {isReportOpen && (
        <ReportModal 
          onClose={() => setIsReportOpen(false)} 
          onConfirm={() => {
            setIsReportOpen(false);
            onNext();
          }}
        />
      )}
    </div>
  );
};

export default StrangerVideo;