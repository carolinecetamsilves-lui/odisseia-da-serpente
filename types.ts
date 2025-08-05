export enum GameState {
  MENU,
  PLAYING,
  GAME_OVER,
}

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface WallConfig {
  type: 'teleport' | 'solid';
  teleportDelay?: boolean;
}

export interface FoodConfig {
  timed: boolean;
  timerDuration?: number; // in seconds
  fakeFoodChance: number; // 0 to 1
}

export interface EffectsConfig {
  randomSpeedBoost: boolean;
  fogOfWar: boolean;
  inertia: boolean;
  traps: boolean;
}

export interface DifficultyConfig {
  level: number;
  name: string;
  speed: number; // ms per tick
  boardSize: number;
  walls: WallConfig;
  fixedObstacles: number;
  movingObstacles: number;
  food: FoodConfig;
  effects: EffectsConfig;
}