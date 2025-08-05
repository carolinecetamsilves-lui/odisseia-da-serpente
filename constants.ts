import type { DifficultyConfig } from './types';

export const DIFFICULTY_LEVELS: DifficultyConfig[] = [
  // Level 1: Explorer
  {
    level: 1,
    name: "Explorer",
    speed: 200,
    boardSize: 20,
    walls: { type: 'teleport' },
    fixedObstacles: 0,
    movingObstacles: 0,
    food: { timed: false, fakeFoodChance: 0 },
    effects: { randomSpeedBoost: false, fogOfWar: false, inertia: false, traps: false },
  },
  // Level 2: Adventurer
  {
    level: 2,
    name: "Adventurer",
    speed: 180,
    boardSize: 20,
    walls: { type: 'teleport' },
    fixedObstacles: 0,
    movingObstacles: 0,
    food: { timed: false, fakeFoodChance: 0 },
    effects: { randomSpeedBoost: false, fogOfWar: false, inertia: false, traps: false },
  },
  // Level 3: Adventurer
  {
    level: 3,
    name: "Adventurer",
    speed: 180,
    boardSize: 18,
    walls: { type: 'teleport' },
    fixedObstacles: 2,
    movingObstacles: 0,
    food: { timed: false, fakeFoodChance: 0 },
    effects: { randomSpeedBoost: false, fogOfWar: false, inertia: false, traps: false },
  },
  // Level 4: Adventurer
  {
    level: 4,
    name: "Adventurer",
    speed: 160,
    boardSize: 18,
    walls: { type: 'teleport', teleportDelay: true },
    fixedObstacles: 2,
    movingObstacles: 0,
    food: { timed: false, fakeFoodChance: 0 },
    effects: { randomSpeedBoost: false, fogOfWar: false, inertia: false, traps: false },
  },
  // Level 5: Challenger
  {
    level: 5,
    name: "Challenger",
    speed: 140,
    boardSize: 16,
    walls: { type: 'solid' },
    fixedObstacles: 4,
    movingObstacles: 0,
    food: { timed: false, fakeFoodChance: 0 },
    effects: { randomSpeedBoost: false, fogOfWar: false, inertia: false, traps: false },
  },
  // Level 6: Challenger
  {
    level: 6,
    name: "Challenger",
    speed: 140,
    boardSize: 16,
    walls: { type: 'solid' },
    fixedObstacles: 4,
    movingObstacles: 1,
    food: { timed: false, fakeFoodChance: 0 },
    effects: { randomSpeedBoost: false, fogOfWar: false, inertia: false, traps: false },
  },
  // Level 7: Challenger
  {
    level: 7,
    name: "Challenger",
    speed: 120,
    boardSize: 16,
    walls: { type: 'solid' },
    fixedObstacles: 4,
    movingObstacles: 1,
    food: { timed: true, timerDuration: 3, fakeFoodChance: 0 },
    effects: { randomSpeedBoost: false, fogOfWar: false, inertia: false, traps: false },
  },
  // Level 8: Master
  {
    level: 8,
    name: "Master",
    speed: 100,
    boardSize: 16,
    walls: { type: 'solid' },
    fixedObstacles: 4,
    movingObstacles: 1,
    food: { timed: true, timerDuration: 3, fakeFoodChance: 0 },
    effects: { randomSpeedBoost: true, fogOfWar: true, inertia: false, traps: false },
  },
  // Level 9: Master
  {
    level: 9,
    name: "Master",
    speed: 100,
    boardSize: 15,
    walls: { type: 'solid' },
    fixedObstacles: 2,
    movingObstacles: 2,
    food: { timed: true, timerDuration: 3, fakeFoodChance: 0.15 },
    effects: { randomSpeedBoost: false, fogOfWar: true, inertia: false, traps: false },
  },
  // Level 10: Legend
  {
    level: 10,
    name: "Legend",
    speed: 80,
    boardSize: 15,
    walls: { type: 'solid' },
    fixedObstacles: 3,
    movingObstacles: 3,
    food: { timed: true, timerDuration: 3, fakeFoodChance: 0.25 },
    effects: { randomSpeedBoost: false, fogOfWar: false, inertia: true, traps: true },
  },
];