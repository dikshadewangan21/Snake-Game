import React from 'react';
import { POWER_UPS } from '../utils/constants';

export const PowerUp = ({ powerUp }) => {
  if (!powerUp) return null;

  const config = POWER_UPS[powerUp.type] || POWER_UPS.SHIELD;

  return (
    <div
      className="power-up-item"
      style={{
        left: `${powerUp.x * 5}%`,
        top: `${powerUp.y * 5}%`
      }}
    >
      <div
        className="powerup-halo"
        style={{
          borderColor: config.color,
          boxShadow: `0 0 10px ${config.glow}`
        }}
      />
      <span style={{ position: 'relative', zIndex: 2 }}>{config.icon}</span>
    </div>
  );
};
