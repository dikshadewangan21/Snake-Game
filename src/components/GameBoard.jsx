import React from 'react';
import { Snake } from './Snake';
import { Food } from './Food';
import { PowerUp } from './PowerUp';
import { ParticleCanvas } from './ParticleCanvas';

export const GameBoard = ({
  snake,
  direction,
  food,
  powerUp,
  obstacles,
  hasShield,
  levelUpNotice,
  level,
  burstEffect,
  onTouchStart,
  onTouchEnd
}) => {
  return (
    <div
      className="game-board-container"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Obstacles (Survival Mode) */}
      {obstacles &&
        obstacles.map((obs, index) => (
          <div
            key={`obs-${index}`}
            className="obstacle-item"
            style={{
              left: `${obs.x * 5}%`,
              top: `${obs.y * 5}%`
            }}
          />
        ))}

      {/* Snake */}
      <Snake
        segments={snake}
        direction={direction}
        hasShield={hasShield}
      />

      {/* Food */}
      <Food food={food} />

      {/* Power-up item */}
      <PowerUp powerUp={powerUp} />

      {/* Level-Up Celebration Overlay */}
      {levelUpNotice && (
        <div className="level-up-overlay">
          <div className="level-up-text">LEVEL UP!</div>
          <div className="level-up-sub">LEVEL {level}</div>
        </div>
      )}

      {/* Particle explosion canvas */}
      <ParticleCanvas triggerBurst={burstEffect} />
    </div>
  );
};
