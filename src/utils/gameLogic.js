import {
  BASE_SPEED,
  MIN_SPEED,
  SPEED_DECREMENT_PER_LEVEL,
  POINTS_PER_LEVEL,
  GRID_SIZE
} from './constants';
import { isSamePosition } from './collision';

export const calculateSpeed = (level, activeEffects) => {
  // Base progression speed
  let speed = Math.max(MIN_SPEED, BASE_SPEED - (level - 1) * SPEED_DECREMENT_PER_LEVEL);

  // Active status buffs
  if (activeEffects.SLOW_MO) {
    speed *= 1.45; // 45% slower
  }
  if (activeEffects.SPEED_FOOD) {
    speed *= 0.8;  // 20% faster
  }
  if (activeEffects.SLOW_FOOD) {
    speed *= 1.3;  // 30% slower
  }
  if (activeEffects.SPEED_BOOST) {
    speed *= 0.75; // 25% faster
  }

  return Math.round(speed);
};

export const calculateLevel = (score) => {
  return Math.floor(score / POINTS_PER_LEVEL) + 1;
};

export const calculateScoreGain = (basePoints, comboMultiplier, activeEffects) => {
  let multiplier = comboMultiplier || 1;

  if (activeEffects.SCORE_X3) {
    multiplier *= 3;
  }
  if (activeEffects.MULTIPLIER_FOOD) {
    multiplier *= 2;
  }
  if (activeEffects.SPEED_BOOST) {
    multiplier *= 1.5;
  }

  return Math.round(basePoints * multiplier);
};

export const generateObstacles = (level, occupiedPositions = []) => {
  // Survival mode spawns obstacles based on level
  const count = Math.min(24, Math.max(3, level * 3));
  const obstacles = [];

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    while (attempts < 100) {
      attempts++;
      const x = Math.floor(Math.random() * (GRID_SIZE - 4)) + 2;
      const y = Math.floor(Math.random() * (GRID_SIZE - 4)) + 2;
      const cand = { x, y };

      const isOccupied = occupiedPositions.some((p) => isSamePosition(p, cand)) ||
                         obstacles.some((o) => isSamePosition(o, cand));

      if (!isOccupied) {
        obstacles.push(cand);
        break;
      }
    }
  }

  return obstacles;
};

export const applyMagnetPull = (foodPos, headPos) => {
  if (!foodPos || !headPos) return foodPos;

  let newX = foodPos.x;
  let newY = foodPos.y;

  if (foodPos.x < headPos.x) newX++;
  else if (foodPos.x > headPos.x) newX--;

  if (foodPos.y < headPos.y) newY++;
  else if (foodPos.y > headPos.y) newY--;

  return { ...foodPos, x: newX, y: newY };
};
