import { GRID_SIZE } from './constants';

export const isSamePosition = (pos1, pos2) => {
  return pos1 && pos2 && pos1.x === pos2.x && pos1.y === pos2.y;
};

export const checkWallCollision = (head) => {
  return head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE;
};

export const checkSelfCollision = (head, body) => {
  // Body elements excluding the head
  for (let i = 1; i < body.length; i++) {
    if (isSamePosition(head, body[i])) {
      return true;
    }
  }
  return false;
};

export const checkObstacleCollision = (head, obstacles) => {
  if (!obstacles || obstacles.length === 0) return false;
  return obstacles.some((obs) => isSamePosition(head, obs));
};

export const wrapCoordinates = (head) => {
  let { x, y } = head;
  if (x < 0) x = GRID_SIZE - 1;
  else if (x >= GRID_SIZE) x = 0;

  if (y < 0) y = GRID_SIZE - 1;
  else if (y >= GRID_SIZE) y = 0;

  return { x, y };
};

export const getDistance = (pos1, pos2) => {
  return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
};
