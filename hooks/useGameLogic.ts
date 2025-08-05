import { useState, useEffect, useCallback } from 'react';
import type { DifficultyConfig, Coordinates } from '../types';
import { Direction } from '../types';

const areCoordsEqual = (coord1: Coordinates, coord2: Coordinates) => {
  return coord1.x === coord2.x && coord1.y === coord2.y;
};

export const useGameLogic = (difficulty: DifficultyConfig, onGameOver: (score: number) => void) => {
  const { boardSize, speed, walls, fixedObstacles: numFixedObstacles } = difficulty;

  const createInitialSnake = (): Coordinates[] => [{ x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) }];
  
  const [snake, setSnake] = useState<Coordinates[]>(createInitialSnake);
  const [food, setFood] = useState<Coordinates>({ x: -1, y: -1 });
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [score, setScore] =useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [obstacles, setObstacles] = useState<Coordinates[]>([]);

  const isOccupied = useCallback((coord: Coordinates, checkSnake = true): boolean => {
    if (checkSnake && snake.some(segment => areCoordsEqual(segment, coord))) {
      return true;
    }
    if (obstacles.some(obstacle => areCoordsEqual(obstacle, coord))) {
      return true;
    }
    return false;
  }, [snake, obstacles]);

  const generateRandomCoords = useCallback((): Coordinates => {
    let newCoord: Coordinates;
    do {
      newCoord = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
      };
    } while (isOccupied(newCoord));
    return newCoord;
  }, [boardSize, isOccupied]);

  const generateFood = useCallback(() => {
    setFood(generateRandomCoords());
  }, [generateRandomCoords]);
  
  const generateObstacles = useCallback(() => {
      const newObstacles: Coordinates[] = [];
      const initialSnakePos = createInitialSnake()[0];
      for (let i = 0; i < numFixedObstacles; i++) {
        let newObstacle: Coordinates;
        do {
            newObstacle = {
                x: Math.floor(Math.random() * boardSize),
                y: Math.floor(Math.random() * boardSize),
            };
        } while (isOccupied(newObstacle, false) || newObstacles.some(o => areCoordsEqual(o, newObstacle)) || areCoordsEqual(newObstacle, initialSnakePos));
        newObstacles.push(newObstacle);
      }
      setObstacles(newObstacles);
  }, [boardSize, isOccupied, numFixedObstacles]);


  const resetGame = useCallback(() => {
    setSnake(createInitialSnake());
    setDirection(Direction.RIGHT);
    setScore(0);
    setIsPaused(false);
    generateObstacles();
    generateFood();
  }, [generateObstacles, generateFood]);
  
  useEffect(() => {
    resetGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);


  const changeDirection = useCallback((newDirection: Direction) => {
    setDirection(prevDirection => {
      if (isPaused) return prevDirection;
      const isOpposite = (dir1: Direction, dir2: Direction) =>
        (dir1 === Direction.UP && dir2 === Direction.DOWN) ||
        (dir1 === Direction.DOWN && dir2 === Direction.UP) ||
        (dir1 === Direction.LEFT && dir2 === Direction.RIGHT) ||
        (dir1 === Direction.RIGHT && dir2 === Direction.LEFT);

      if (isOpposite(prevDirection, newDirection) && snake.length > 1) {
        return prevDirection;
      }
      return newDirection;
    });
  }, [isPaused, snake.length]);

  const gameTick = useCallback(() => {
    if (isPaused) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      let head = { ...newSnake[0] };

      switch (direction) {
        case Direction.UP: head.y -= 1; break;
        case Direction.DOWN: head.y += 1; break;
        case Direction.LEFT: head.x -= 1; break;
        case Direction.RIGHT: head.x += 1; break;
      }

      // Wall collision
      if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        if (walls.type === 'teleport') {
          if (head.x < 0) head.x = boardSize - 1;
          else if (head.x >= boardSize) head.x = 0;
          if (head.y < 0) head.y = boardSize - 1;
          else if (head.y >= boardSize) head.y = 0;
        } else {
          onGameOver(score);
          return prevSnake;
        }
      }

      // Self-collision
      for (let i = 1; i < newSnake.length; i++) {
        if (areCoordsEqual(head, newSnake[i])) {
          onGameOver(score);
          return prevSnake;
        }
      }
      
      // Obstacle collision
      if (obstacles.some(obstacle => areCoordsEqual(head, obstacle))) {
          onGameOver(score);
          return prevSnake;
      }

      newSnake.unshift(head);

      // Food consumption
      if (areCoordsEqual(head, food)) {
        setScore(prev => prev + 10);
        generateFood();
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }, [isPaused, direction, boardSize, walls.type, score, onGameOver, food, generateFood, obstacles]);

  useEffect(() => {
    const gameInterval = setInterval(gameTick, speed);
    return () => clearInterval(gameInterval);
  }, [gameTick, speed]);
  
  return { snake, food, obstacles, score, boardSize, changeDirection, isPaused, setIsPaused };
};