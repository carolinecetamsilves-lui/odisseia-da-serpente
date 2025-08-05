import React, { useState, useCallback } from 'react';
import Game from './components/Game';
import DifficultySelector from './components/DifficultySelector';
import { GameState } from './types';
import type { DifficultyConfig } from './types';
import { DIFFICULTY_LEVELS } from './constants';
import GameOverScreen from './components/GameOverScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [difficulty, setDifficulty] = useState<DifficultyConfig>(DIFFICULTY_LEVELS[0]);
  const [lastScore, setLastScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('serpentOdysseyHighScore');
    return saved ? JSON.parse(saved) : {};
  });

  const handleSelectDifficulty = useCallback((level: number) => {
    const selectedDifficulty = DIFFICULTY_LEVELS.find(d => d.level === level);
    if (selectedDifficulty) {
      setDifficulty(selectedDifficulty);
      setGameState(GameState.PLAYING);
    }
  }, []);

  const handleGameOver = useCallback((score: number) => {
    setLastScore(score);
    const currentHighScore = highScore[difficulty.level] || 0;
    if (score > currentHighScore) {
      const newHighScores = { ...highScore, [difficulty.level]: score };
      setHighScore(newHighScores);
      localStorage.setItem('serpentOdysseyHighScore', JSON.stringify(newHighScores));
    }
    setGameState(GameState.GAME_OVER);
  }, [difficulty.level, highScore]);

  const handleRestart = useCallback(() => {
    setGameState(GameState.PLAYING);
  }, []);

  const handleBackToMenu = useCallback(() => {
    setGameState(GameState.MENU);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.MENU:
        return <DifficultySelector onSelectDifficulty={handleSelectDifficulty} highScores={highScore} />;
      case GameState.PLAYING:
        return <Game difficulty={difficulty} onGameOver={handleGameOver} highScore={highScore[difficulty.level] || 0} />;
      case GameState.GAME_OVER:
        return <GameOverScreen 
                  score={lastScore} 
                  highScore={highScore[difficulty.level] || 0} 
                  levelName={difficulty.name}
                  onRestart={handleRestart} 
                  onBackToMenu={handleBackToMenu}
                />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 select-none">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;