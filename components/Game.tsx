import React, { useEffect } from 'react';
import type { DifficultyConfig } from '../types';
import { Direction } from '../types';
import { useGameLogic } from '../hooks/useGameLogic';
import { useSwipe } from '../hooks/useSwipe';
import GameBoard from './GameBoard';

interface GameProps {
  difficulty: DifficultyConfig;
  onGameOver: (score: number) => void;
  highScore: number;
}

const Game: React.FC<GameProps> = ({ difficulty, onGameOver, highScore }) => {
  const { snake, food, obstacles, score, boardSize, changeDirection } = useGameLogic(difficulty, onGameOver);
  
  const handleSwipe = (direction: Direction) => {
    changeDirection(direction);
  };
  
  const swipeHandlers = useSwipe({ onSwipe: handleSwipe });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let newDirection: Direction | null = null;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          newDirection = Direction.UP;
          break;
        case 'ArrowDown':
        case 's':
          newDirection = Direction.DOWN;
          break;
        case 'ArrowLeft':
        case 'a':
          newDirection = Direction.LEFT;
          break;
        case 'ArrowRight':
        case 'd':
          newDirection = Direction.RIGHT;
          break;
      }
      if (newDirection !== null) {
        e.preventDefault();
        changeDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection]);

  return (
    <div className="w-full h-full flex flex-col items-center" {...swipeHandlers}>
      <div className="w-full max-w-lg flex justify-between items-center p-2 bg-gray-800 rounded-t-lg">
        <div className="text-lg">Score: <span className="text-cyan-400 font-bold">{score}</span></div>
        <div className="text-lg text-center">Lvl {difficulty.level}: <span className="text-yellow-400">{difficulty.name}</span></div>
        <div className="text-lg">High: <span className="text-green-400 font-bold">{highScore}</span></div>
      </div>
      <GameBoard 
        boardSize={boardSize}
        snake={snake}
        food={food}
        obstacles={obstacles}
        effects={difficulty.effects}
      />
      <div className="w-full max-w-lg p-2 text-center text-gray-400 text-sm bg-gray-800 rounded-b-lg md:hidden">
        Swipe to move
      </div>
       <div className="w-full max-w-lg p-2 text-center text-gray-400 text-sm bg-gray-800 rounded-b-lg hidden md:block">
        Use Arrow Keys or WASD to move
      </div>
    </div>
  );
};

export default Game;