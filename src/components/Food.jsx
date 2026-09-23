import React from 'react';
import { FOOD_TYPES } from '../utils/constants';

export const Food = ({ food }) => {
  if (!food) return null;

  const config = FOOD_TYPES[food.type] || FOOD_TYPES.NORMAL;
  const isNormal = food.type === 'NORMAL';
  const isRainbow = food.type === 'RAINBOW';

  return (
    <div
      className={`food-item ${isRainbow ? 'food-rainbow' : ''}`}
      style={{
        left: `${food.x * 5}%`,
        top: `${food.y * 5}%`
      }}
    >
      {isNormal ? (
        /* Red CSS apple for the classic food */
        <div className="food-apple" />
      ) : (
        /* Emoji + glow for special foods */
        <>
          <div
            className="food-glow-circle"
            style={{ background: config.color }}
          />
          <span className="food-emoji">{config.icon}</span>
        </>
      )}
    </div>
  );
};
