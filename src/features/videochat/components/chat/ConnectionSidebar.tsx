import React from 'react';
import ChatSidebar from './ChatSidebar';

interface ConnectionSidebarProps {
  status: string; // "searching" | "connecting" | "connected"
  messages: any[];
  onSendMessage: (text: string) => void;
  onSendGiftToVideo: (emoji: string) => void;
}

const ConnectionSidebar: React.FC<ConnectionSidebarProps> = ({ status, messages, onSendMessage,onSendGiftToVideo }) => {
  const isConnected = status === 'connected';

  return (
    <div className="flex flex-col h-full bg-[#7c7fff]/30 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
      {/* HEADER: Always visible once we leave the 'idle' state */}
      <div className="p-4 bg-white/10 flex items-center gap-3 border-b border-white/5">
        <div className="w-8 h-8 bg-[#ffff00] rounded-full flex items-center justify-center text-lg shadow-[0_0_15px_rgba(255,255,0,0.3)]">
          🐵
        </div>
        <span className="text-white font-bold text-sm">
          {isConnected ? 'Chatting' : 
           status === 'searching' ? 'looking for a match' : 'Connecting...'}
        </span>
      </div>

      {/* BODY: Conditional rendering based on connection */}
      <div className="flex-1 overflow-hidden">
        {isConnected ? (
          /* ONLY SHOW CHAT SECTION WHEN CONNECTED */
          <ChatSidebar messages={messages} onSendMessage={onSendMessage}
          onSendGiftToVideo={onSendGiftToVideo} />
        ) : (
          /* SEARCHING STATE: Empty purple panel (Matches Screenshot 1, 3, 4) */
          <div className="h-full w-full flex flex-col items-center justify-center p-10">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-[#ffff00] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#ffff00] rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionSidebar;