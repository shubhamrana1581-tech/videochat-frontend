import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatTimer } from '../hooks/useChatTimer';
import ConnectingScreen from './video/ConnectingScreen';
import ConnectedChatUI from './video/ConnectedChatUI';
import InterestPicker from './video/InterestPicker';
import ReportModal from './modals/ReportModal';
import { playMatchSound } from './utils/sounds';
import ReportButton from './video/ReportButton';

interface StrangerVideoProps {
  stream: MediaStream | null;
  status: "idle" | "searching" | "connecting" | "connected" | "disconnected";
  onNext: () => void;
  onToggleTheater: () => void;
  isTheaterMode: boolean;
  selectedInterests: string[];
  onToggleInterest: (id: string) => void;
}

const StrangerVideo: React.FC<StrangerVideoProps> = ({ 
  stream, 
  status, 
  onNext, 
  onToggleTheater, 
  isTheaterMode, 
  selectedInterests, 
  onToggleInterest 
}) => {
    
  const videoRef = useRef<HTMLVideoElement>(null);
  const { timeLeft, startTimer, addTime } = useChatTimer(15, onNext);
  const [messages, setMessages] = useState<any[]>([]);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // 1. Handle Video Stream Attachment
  useEffect(() => {
    if (videoRef.current && stream && status === 'connected') {
      videoRef.current.srcObject = stream;
    }
  }, [stream, status]);

  // 2. Handle Connection Events (Sound & Timer)
  useEffect(() => {
    if (status === 'connected') {
      startTimer();
      setMessages([]); 
      playMatchSound(); 
    }
  }, [status, startTimer]);

  const handleSendMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), text, sender: 'me' }]);
  };

  return (
    <div className="relative w-full h-full bg-[#12101f] rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl flex items-center justify-center">
      
      <AnimatePresence mode="wait">
        {/* 1️⃣ STATUS === "connected" : Show the Real Chat Panel UI */}
        {status === 'connected' ? (
            <div className="relative w-full h-full">
 <ConnectedChatUI
            key="connected-ui"
            videoRef={videoRef}
            stream={stream}
            timeLeft={timeLeft}
            onAddTime={() => addTime(15)}
            onNext={onNext}
            onReport={() => setIsReportOpen(true)}
            onToggleTheater={onToggleTheater}
            isTheaterMode={isTheaterMode}
            messages={messages}
            onSendMessage={handleSendMessage}
            selectedInterests={selectedInterests}
          />
          <ReportButton onClick={() => setIsReportOpen(true)} />
            </div>
         
        ) : status === 'idle' ? (
          /* OPTIONAL: Keep Interest Picker for Idle state if desired, 
             otherwise status !== 'connected' logic handles everything else */
          <motion.div 
            key="idle-state"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="p-6 text-center"
          >
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-white font-black italic uppercase text-2xl mb-1">What's your vibe?</h3>
            <p className="text-white/30 font-bold text-[10px] uppercase mb-6 tracking-widest">Select interests to find better matches</p>
            <InterestPicker 
              selectedInterests={selectedInterests} 
              onToggleInterest={onToggleInterest} 
            />
          </motion.div>
        ) : (
          /* 2️⃣ STATUS !== "connected" : Show Searching/Connecting state */
          <ConnectingScreen key="connecting-ui" />
        )}
      </AnimatePresence>

      {/* 3. MODALS (Stay outside AnimatePresence to avoid layout issues) */}
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