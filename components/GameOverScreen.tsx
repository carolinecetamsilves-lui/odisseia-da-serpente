import React from 'react';

interface GameOverScreenProps {
  score: number;
  highScore: number;
  levelName: string;
  onRestart: () => void;
  onBackToMenu: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, highScore, levelName, onRestart, onBackToMenu }) => {
  const isNewHighScore = score > 0 && score === highScore;
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg shadow-2xl border-2 border-red-500/50 w-full max-w-md text-center">
      <h2 className="text-5xl font-bold text-red-500 mb-4">GAME OVER</h2>
      <p className="text-lg text-gray-300 mb-2">You played on <span className="font-bold text-yellow-400">{levelName}</span></p>
      {isNewHighScore && (
        <div className="my-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
          <p className="text-2xl font-bold text-green-400 animate-pulse">New High Score!</p>
        </div>
      )}
      <div className="text-2xl text-white mb-2">
        Your Score: <span className="font-bold text-cyan-400">{score}</span>
      </div>
      <div className="text-xl text-gray-400 mb-8">
        High Score: <span className="font-bold text-green-400">{highScore}</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button
          onClick={onRestart}
          className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors duration-200 text-xl"
        >
          Retry
        </button>
        <button
          onClick={onBackToMenu}
          className="w-full px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-colors duration-200 text-xl"
        >
          Menu
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;