import React, { useState } from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';
import StrangerVideo from './components/StrangerVideo';
import LocalVideo from './components/LocalVideo';
import ControlPanel from './components/ControlPanel';
import DashboardNavbar from './components/DashboardNavbar';
import GenderModal from './components/modals/GenderModal'; // The actual popup
import { 
  SafetyModal, HistoryModal, PlusModal, 
  SearchModal, MessageModal, ProfileModal, RecommendedModal 
} from './components/modals';

const DashboardPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string>('both');

  const { localStream, remoteStream, status, startSearching, cleanup } = useWebRTC();

  return (
    <div className="h-screen w-full bg-[#0a0817] flex flex-col overflow-hidden relative">
      <DashboardNavbar onOpenModal={setActiveModal} activeModal={activeModal} />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <div className="flex-1 p-4 lg:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 h-full">
          <div className="relative rounded-[2rem] overflow-hidden bg-black border border-white/5 shadow-2xl">
            <StrangerVideo stream={remoteStream} status={status} />
          </div>
          <div className="relative rounded-[2rem] overflow-hidden bg-[#12101f] border border-white/5 shadow-2xl">
            <LocalVideo stream={localStream} />
          </div>
        </div>

        <div className="h-full border-l border-white/5">
          <ControlPanel 
            onStart={startSearching}
            onOpenGender={() => setActiveModal('gender')}
            selectedGender={selectedGender}
          />
        </div>
      </div>

      {/* Modal Layer */}
      <div className="relative z-[100]">
        {activeModal === 'gender' && (
          <GenderModal 
            currentGender={selectedGender}
            onSave={(g) => { setSelectedGender(g); setActiveModal(null); }}
            onClose={() => setActiveModal(null)} 
          />
        )}
        {activeModal === 'safety' && <SafetyModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'search' && <SearchModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'plus' && <PlusModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'messages' && <MessageModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'history' && <HistoryModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'profile' && <ProfileModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'recommended' && <RecommendedModal onClose={() => setActiveModal(null)} />}
      </div>
    </div>
  );
};

export default DashboardPage;