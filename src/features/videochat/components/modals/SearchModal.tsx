import React from 'react';
import { Search } from 'lucide-react';
import ModalLayout from './ModalLayout';

const SearchModal = ({ onClose }: { onClose: () => void }) => (
  <ModalLayout title="Find Friends" onClose={onClose} position="right">
    <div className="relative mb-6">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
      <input 
        type="text" 
        placeholder="Search by username..." 
        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-yellow-400 transition-all"
        autoFocus
      />
    </div>
    <div className="space-y-4">
      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Suggested</p>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500" />
            <span className="font-bold text-white/90">Stranger_{i}k</span>
          </div>
          <button className="text-xs bg-yellow-400 text-black px-4 py-1.5 rounded-full font-black hover:scale-105 transition-transform">Add</button>
        </div>
      ))}
    </div>
  </ModalLayout>
);

export default SearchModal;