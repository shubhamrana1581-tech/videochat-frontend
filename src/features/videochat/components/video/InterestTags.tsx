import React from 'react';

const InterestTags: React.FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <div className="absolute top-20 left-6 flex flex-wrap gap-2 max-w-[200px] z-20">
      {tags.map(tag => (
        <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-white border border-white/10 uppercase italic">
          #{tag}
        </span>
      ))}
    </div>
  );
};

export default InterestTags;