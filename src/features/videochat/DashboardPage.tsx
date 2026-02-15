import React, { useState } from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';
import ControlPanel from './components/ControlPanel';
import DashboardNavbar from './components/DashboardNavbar';
import VideoGrid from './components/video/VideoGrid';
import { motion, AnimatePresence } from 'framer-motion';
import ConnectionSidebar from './components/chat/ConnectionSidebar';
import VibeSelector from './components/interests/VibeSelector';
import GiftAnimation from './components/video/GiftAnimation'; 

// Modals
import GenderModal from './components/modals/GenderModal';
import { 
  SafetyModal, HistoryModal, PlusModal, 
  SearchModal, MessageModal, ProfileModal, RecommendedModal 
} from './components/modals';
import InviteModal from './components/modals/InviteModal';

const DashboardPage: React.FC = () => {
  const [isSquadMode, setIsSquadMode] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [selectedGender, setSelectedGender] = useState('both');
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  // Feature 4: Gift Animation State
  const [activeGifts, setActiveGifts] = useState<{ id: string; emoji: string }[]>([]);

  const { localStream, remoteStream, status, startSearching, cleanup } = useWebRTC();

  const handleSendMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), text, sender: 'me' }]);
  };

  const handleToggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Feature 4: Handler for sending gifts
  const handleSendGift = (emoji: string) => {
    const newGift = { id: Math.random().toString(36).substr(2, 9), emoji };
    setActiveGifts(prev => [...prev, newGift]);
  };

  const removeGift = (id: string) => {
    setActiveGifts(prev => prev.filter(g => g.id !== id));
  };

  return (
    <div className="h-screen w-full bg-[#6366f1] flex flex-col overflow-hidden relative">
      <DashboardNavbar onOpenModal={setActiveModal} activeModal={activeModal} />

      <main className="flex-1 flex overflow-hidden p-4 lg:p-6 gap-6 relative">
        
        {/* LEFT PANEL: Vibe Selector - Disappears when Searching/Connected */}
        <AnimatePresence mode="wait">
          {status === 'idle' && !isTheaterMode && (
            <motion.div 
              key="vibe-panel"
              initial={{ x: -350, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -350, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="hidden xl:block w-[320px] h-full"
            >
              <VibeSelector 
                selectedInterests={selectedInterests}
                onToggleInterest={handleToggleInterest}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CENTER PANEL: Video Grid */}
        <div className="flex-1 min-w-0 h-full relative">
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
            onLocalStreamUpdate={(newStream) => console.log("Stream updated:", newStream)}
          />

          {/* Feature 4: Gift Animations Layer */}
          <div className="absolute inset-0 pointer-events-none z-[60]">
            <AnimatePresence>
              {activeGifts.map((gift) => (
                <GiftAnimation 
                  key={gift.id} 
                  id={gift.id} // Fix: Passing ID properly
                  emoji={gift.emoji} 
                  onComplete={() => removeGift(gift.id)} 
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT PANEL: Dynamic Sidebar */}
        <AnimatePresence mode="wait">
          {!isTheaterMode && (
            <motion.div 
              key={status === 'idle' ? 'idle-panel' : 'active-session-panel'}
              initial={{ x: 450, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 450, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="hidden lg:block w-[380px] h-full"
            >
              {status === 'idle' ? (
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
                <ConnectionSidebar 
                  status={status}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  onSendGiftToVideo={handleSendGift}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Theater Exit Button */}
      <AnimatePresence>
        {isTheaterMode && (
          <motion.button 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            onClick={() => setIsTheaterMode(false)}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#ffff00] text-black px-10 py-4 rounded-full font-black shadow-2xl z-50 uppercase italic text-xs border-b-4 border-black/20"
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
              onSave={(gender) => { setSelectedGender(gender); setActiveModal(null); }}
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