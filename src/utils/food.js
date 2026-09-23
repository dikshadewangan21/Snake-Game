import { GRID_SIZE, FOOD_TYPES, POWER_UPS } from './constants';
import { isSamePosition } from './collision';

export const getRandomPosition = (occupiedPositions = []) => {
  const available = [];
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      const isOccupied = occupiedPositions.some((pos) => pos.x === x && pos.y === y);
      if (!isOccupied) {
        available.push({ x, y });
      }
    }
  }

  if (available.length === 0) {
    return { x: 0, y: 0 };
  }

  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
};

export const getRandomFoodType = () => {
  const types = Object.values(FOOD_TYPES);
  const totalWeight = types.reduce((acc, curr) => acc + curr.weight, 0);
  let randomNum = Math.random() * totalWeight;

  for (const item of types) {
    if (randomNum < item.weight) {
      return item;
    }
    randomNum -= item.weight;
  }
  return FOOD_TYPES.NORMAL;
};

export const spawnFood = (occupiedPositions = []) => {
  const position = getRandomPosition(occupiedPositions);
  const type = getRandomFoodType();
  return {
    ...position,
    type: type.id,
    id: `${Date.now()}-${Math.random()}`,
    spawnTime: Date.now()
  };
};

export const spawnPowerUp = (occupiedPositions = []) => {
  const position = getRandomPosition(occupiedPositions);
  const powerUpTypes = Object.values(POWER_UPS);
  const selectedType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];

  return {
    ...position,
    type: selectedType.id,
    id: `pw-${Date.now()}-${Math.random()}`,
    lifetimeSeconds: 12,
    createdAt: Date.now()
  };
};
