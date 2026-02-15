import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatTimer } from '../hooks/useChatTimer';
import ConnectedChatUI from './video/ConnectedChatUI';
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
}

const StrangerVideo: React.FC<StrangerVideoProps> = ({ 
  stream, 
  status, 
  onNext, 
  onToggleTheater, 
  isTheaterMode, 
  selectedInterests, 
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
        {status === 'connected' ? (
          <motion.div 
            key="connected-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full"
          >
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
          </motion.div>
        ) : (
          /* Simplified State: When not connected, we show nothing here 
             because the ActiveMatchOverlay in VideoGrid handles the UI 
          */
          <motion.div 
            key="empty-state"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="w-full h-full bg-black/20"
          />
        )}
      </AnimatePresence>

      {/* 3. MODALS */}
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