import React from 'react';

interface GenderTriggerProps {
  selectedGender: string;
  onClick: () => void;
}

const GenderTrigger: React.FC<GenderTriggerProps> = ({ selectedGender, onClick }) => {
  const labels: Record<string, string> = {
    girls: '👱‍♀️ Girls Only',
    guys: '👱 Guys Only',
    both: '👫 Both'
  };

  return (
    <button
      onClick={onClick}
      className="w-full py-4 bg-white text-gray-800 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl hover:bg-gray-50 active:scale-[0.98] transition-all mb-3"
    >
      {labels[selectedGender] || '👫 Both'}
    </button>
  );
};

export default GenderTrigger;