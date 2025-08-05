import React from 'react';
import type { Coordinates, EffectsConfig } from '../types';

interface GameBoardProps {
  boardSize: number;
  snake: Coordinates[];
  food: Coordinates;
  obstacles: Coordinates[];
  effects: EffectsConfig;
}

const GameBoard: React.FC<GameBoardProps> = ({ boardSize, snake, food, obstacles, effects }) => {
  const cells = Array.from({ length: boardSize * boardSize });

  const getCellContent = (index: number) => {
    const x = index % boardSize;
    const y = Math.floor(index / boardSize);

    if (snake.some(segment => segment.x === x && segment.y === y)) {
      const isHead = snake[0].x === x && snake[0].y === y;
      return <div className={`w-full h-full ${isHead ? 'bg-green-400' : 'bg-green-600'} rounded-sm`}></div>;
    }
    if (food.x === x && food.y === y) {
      return <div className="w-full h-full bg-red-500 rounded-full animate-pulse"></div>;
    }
    if (obstacles.some(obstacle => obstacle.x === x && obstacle.y === y)) {
      return <div className="w-full h-full bg-gray-600"></div>;
    }
    return null;
  };
  
  const fogStyle = effects.fogOfWar ? {
    maskImage: `radial-gradient(circle at ${snake[0].x * 100 / boardSize}% ${snake[0].y * 100 / boardSize}%, transparent -50%, black 70%)`,
    WebkitMaskImage: `radial-gradient(circle at ${snake[0].x * 100 / boardSize}% ${snake[0].y * 100 / boardSize}%, transparent -50%, black 70%)`,
  } : {};

  return (
    <div className="relative aspect-square w-full max-w-lg bg-gray-800 border-4 border-gray-700">
      <div 
        className="grid absolute inset-0"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
          gridTemplateRows: `repeat(${boardSize}, 1fr)`,
          ...fogStyle
        }}
      >
        {cells.map((_, index) => (
          <div key={index} className="w-full h-full border-t border-l border-gray-900/50">
            {getCellContent(index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;