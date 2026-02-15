import React, { useState } from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';
import ControlPanel from './components/ControlPanel';
import DashboardNavbar from './components/DashboardNavbar';
import VideoGrid from './components/video/VideoGrid';
import { motion, AnimatePresence } from 'framer-motion';
import ConnectionSidebar from './components/chat/ConnectionSidebar';
// Modals
import GenderModal from './components/modals/GenderModal';
import { 
  SafetyModal, HistoryModal, PlusModal, 
  SearchModal, MessageModal, ProfileModal, RecommendedModal 
} from './components/modals';
import InviteModal from './components/modals/InviteModal';
import ChatSidebar from './components/chat/ChatSidebar';
import VibeSelector from './components/interests/VibeSelector';
const DashboardPage: React.FC = () => {
  const [isSquadMode, setIsSquadMode] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [selectedGender, setSelectedGender] = useState('both');
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  // Status comes from your WebRTC hook: "idle" | "searching" | "connecting" | "connected"
  const { localStream, remoteStream, status, startSearching, cleanup } = useWebRTC();

  const handleSendMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), text, sender: 'me' }]);
    // socket.emit('chat_message', text); // Integration point
  };

  const handleToggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="h-screen w-full bg-[#6366f1] flex flex-col overflow-hidden relative">
      <DashboardNavbar onOpenModal={setActiveModal} activeModal={activeModal} />

      <main className="flex-1 flex overflow-hidden p-4 lg:p-6 gap-6 relative">
        
        {/* 1. MODULAR VIDEO GRID (Main Content) */}
        <div className="flex-1 min-w-0 h-full">
          <VideoGrid 
            isSquadMode={isSquadMode}
            remoteStream={remoteStream}
            localStream={localStream}
            status={status}
            onNext={startSearching}
            onToggleTheater={() => setIsTheaterMode(!isTheaterMode)}
            isTheaterMode={isTheaterMode}
            onInvite={() => setActiveModal('invite')}
            selectedInterests={selectedInterests}
            onToggleInterest={handleToggleInterest}
            onLocalStreamUpdate={(newStream) => {
               console.log("Stream updated:", newStream);
            }}
          />
        </div>

        {/* 2. DYNAMIC SIDEBAR (The "Third Panel") */}
       <AnimatePresence mode="wait">
          {!isTheaterMode && (
            <motion.div 
              // Key ensures smooth transition when switching components
              key={status === 'idle' ? 'idle-panel' : 'active-session-panel'}
              initial={{ x: 450, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 450, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="hidden lg:block w-[380px] h-full"
            >
              {status === 'idle' ? (
                /* SCREENSHOT 2: Rightmost Start Panel */
                <ControlPanel 
                  status={status}
                  onStart={startSearching}
                  onStop={cleanup}
                  onOpenGender={() => setActiveModal('gender')}
                  selectedGender={selectedGender}
                  isSquadMode={isSquadMode}
                  setSquadMode={setIsSquadMode}
                />
              ) : (
                /* SCREENSHOT 1 & 3: The Connecting/Chat Panel */
                <ConnectionSidebar 
                  status={status}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Exit Button for Theater Mode */}
      <AnimatePresence>
        {isTheaterMode && (
          <motion.button 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            onClick={() => setIsTheaterMode(false)}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#ffff00] text-black px-10 py-4 rounded-full font-black shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 uppercase italic tracking-widest text-xs border-b-4 border-black/20"
          >
            Exit Theater Mode
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* MODAL LAYER */}
      <div className="relative z-[100]">
        <AnimatePresence>
          {activeModal === 'invite' && <InviteModal onClose={() => setActiveModal(null)} />}
          {activeModal === 'gender' && (
            <GenderModal 
              currentGender={selectedGender}
              onClose={() => setActiveModal(null)}
              onSave={(gender) => {
                setSelectedGender(gender);
                setActiveModal(null);
              }}
            />
          )}
          {activeModal === 'safety' && <SafetyModal onClose={() => setActiveModal(null)} />}
          {activeModal === 'search' && <SearchModal onClose={() => setActiveModal(null)} />}
          {activeModal === 'plus' && <PlusModal onClose={() => setActiveModal(null)} />}
          {activeModal === 'messages' && <MessageModal onClose={() => setActiveModal(null)} />}
          {activeModal === 'history' && <HistoryModal onClose={() => setActiveModal(null)} />}
          {activeModal === 'profile' && <ProfileModal onClose={() => setActiveModal(null)} />}
          {activeModal === 'recommended' && <RecommendedModal onClose={() => setActiveModal(null)} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardPage;