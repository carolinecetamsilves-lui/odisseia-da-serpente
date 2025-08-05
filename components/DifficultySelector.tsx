import React from 'react';
import { DIFFICULTY_LEVELS } from '../constants';

interface DifficultySelectorProps {
  onSelectDifficulty: (level: number) => void;
  highScores: { [key: number]: number };
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelectDifficulty, highScores }) => {
  return (
    <div className="w-full max-w-2xl text-center">
      <h1 className="text-5xl md:text-7xl font-bold text-green-400 mb-2 tracking-widest">
        SERPENT'S ODYSSEY
      </h1>
      <p className="text-gray-400 mb-8 text-lg">Select a difficulty level to begin your journey.</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {DIFFICULTY_LEVELS.map(diff => (
          <button
            key={diff.level}
            onClick={() => onSelectDifficulty(diff.level)}
            className="group relative flex flex-col justify-center items-center p-4 bg-gray-800 rounded-lg border-2 border-gray-700 hover:bg-green-900 hover:border-green-500 transition-all duration-200"
          >
            <div className="text-2xl font-bold text-cyan-400 group-hover:text-white">
              Level {diff.level}
            </div>
            <div className="text-md text-yellow-400 group-hover:text-yellow-300">{diff.name}</div>
            <div className="text-sm text-gray-400 mt-2">
              High: <span className="text-green-400 font-semibold">{highScores[diff.level] || 0}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;