import React, { useState, useEffect } from 'react';

const MESSAGES = [
  { user: "Sarah", text: "Yo! Anyone from London? 🇬🇧", color: "bg-pink-500" },
  { user: "Mike", text: "Just joined, this is wild! ⚡️", color: "bg-blue-500" },
  { user: "Alex", text: "Add me on IG later! 🔥", color: "bg-orange-500" },
  { user: "Jen", text: "The squad mode is so fun haha", color: "bg-green-500" },
];

const ChatOverlay = () => {
  const [visibleMessages, setVisibleMessages] = useState<typeof MESSAGES>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setVisibleMessages(prev => [...prev.slice(-2), MESSAGES[i]]);
      i = (i + 1) % MESSAGES.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-32 left-8 right-8 flex flex-col gap-2 pointer-events-none">
      {visibleMessages.map((msg, idx) => (
        <div 
          key={idx} 
          className="animate-in slide-in-from-left-4 fade-in duration-500 flex items-start gap-2"
        >
          <div className={`w-6 h-6 rounded-lg ${msg.color} flex-shrink-0 mt-1`} />
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 max-w-[80%]">
            <p className="text-[10px] font-black uppercase text-white/40 mb-0.5">{msg.user}</p>
            <p className="text-sm font-medium text-white/90 leading-tight">{msg.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatOverlay;