import React, { useState } from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';
import ControlPanel from './components/ControlPanel';
import DashboardNavbar from './components/DashboardNavbar';
import VideoGrid from './components/video/VideoGrid'; // Imported new component
import { motion, AnimatePresence } from 'framer-motion';

// Modals
import GenderModal from './components/modals/GenderModal';
import { 
  SafetyModal, HistoryModal, PlusModal, 
  SearchModal, MessageModal, ProfileModal, RecommendedModal 
} from './components/modals';
import InviteModal from './components/modals/InviteModal';
import ChatSidebar from './components/chat/ChatSidebar';

const DashboardPage: React.FC = () => {
  const [isSquadMode, setIsSquadMode] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [selectedGender, setSelectedGender] = useState('both');
const [messages, setMessages] = useState<any[]>([]);
  const { localStream, remoteStream, status, startSearching, cleanup } = useWebRTC();
const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

const handleSendMessage = (text: string) => {
  setMessages(prev => [...prev, { id: Date.now().toString(), text, sender: 'me' }]);
  // Here you would also emit the socket event
};
  const handleToggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };
  return (
    <div className="h-screen w-full bg-[#6366f1] flex flex-col overflow-hidden relative">
      <DashboardNavbar onOpenModal={setActiveModal} activeModal={activeModal} />

      <div className="flex-1 flex overflow-hidden p-4 lg:p-6 gap-6 relative">
        
        {/* MODULAR VIDEO GRID */}
        <VideoGrid 
          isSquadMode={isSquadMode}
          remoteStream={remoteStream}
          localStream={localStream}
          status={status}
          onNext={startSearching}
          onToggleTheater={() => setIsTheaterMode(!isTheaterMode)}
          isTheaterMode={isTheaterMode}
          onInvite={() => setActiveModal('invite')} // Set modal state
          selectedInterests={selectedInterests}
    onToggleInterest={handleToggleInterest}
    onLocalStreamUpdate={(newStream) => {
             console.log("New stream received from flip:", newStream);
             // If your useWebRTC hook has a way to set the stream, call it here
          }}
        />
{/* SIDEBAR: Only visible on Desktop (lg) */}
  {!isTheaterMode && (
    <div className="hidden lg:block w-[380px] h-full transition-all duration-500">
      <ChatSidebar 
        messages={messages} 
        onSendMessage={handleSendMessage} 
      />
    </div>
  )}
        {/* SIDEBAR: Slides out via AnimatePresence */}
        <AnimatePresence>
          {!isTheaterMode && (
            <motion.div 
              initial={{ x: 450, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 450, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="hidden lg:block w-[400px]"
            >
              <ControlPanel 
                status={status}
                onStart={startSearching}
                onStop={cleanup}
                onOpenGender={() => setActiveModal('gender')}
                selectedGender={selectedGender}
                isSquadMode={isSquadMode}
                setSquadMode={setIsSquadMode}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Exit Button */}
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

          {/* New Invite Modal Rendering */}
          {activeModal === 'invite' && (
            <InviteModal onClose={() => setActiveModal(null)} />
          )}
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