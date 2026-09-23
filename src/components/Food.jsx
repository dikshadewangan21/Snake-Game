import React from 'react';
import { FOOD_TYPES } from '../utils/constants';

export const Food = ({ food }) => {
  if (!food) return null;

  const config = FOOD_TYPES[food.type] || FOOD_TYPES.NORMAL;
  const isNormal = food.type === 'NORMAL';
  const isGolden = food.type === 'GOLDEN';
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
        /* Bright red CSS apple */
        <div className="food-apple" />
      ) : isGolden ? (
        /* Golden apple with glow */
        <>
          <div className="food-glow-circle" style={{ background: '#fbbf24' }} />
          <span className="food-emoji" style={{ filter: 'drop-shadow(0 0 6px #fbbf24)' }}>🍎</span>
        </>
      ) : (
        /* Special foods with matching glow */
        <>
          <div className="food-glow-circle" style={{ background: config.color }} />
          <span className="food-emoji">{config.icon}</span>
        </>
      )}
    </div>
  );
};
