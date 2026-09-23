import React from 'react';
import { getSkinById } from '../utils/themes';

const RAINBOW_COLORS = [
  '#ff4444', '#ff8800', '#ffdd00',
  '#44dd44', '#0088ff', '#8844ff', '#ff44cc'
];

export const Snake = ({ segments, direction, hasShield, skinId = 'classic' }) => {
  const skin = getSkinById(skinId);
  const total = segments.length;

  const getDirectionClass = () => {
    if (!direction) return 'head-up';
    if (direction.x === 1) return 'head-right';
    if (direction.x === -1) return 'head-left';
    if (direction.y === 1) return 'head-down';
    return 'head-up';
  };

  const dirClass = getDirectionClass();

  return (
    <>
      {segments.map((segment, index) => {
        const isHead = index === 0;

        if (isHead) {
          return (
            <div
              key="snake-head"
              className={`snake-segment snake-head ${dirClass} ${hasShield ? 'has-shield' : ''}`}
              style={{
                left: `${segment.x * 5}%`,
                top: `${segment.y * 5}%`,
                background: skin.isRainbow
                  ? `linear-gradient(135deg, ${RAINBOW_COLORS[0]}, ${RAINBOW_COLORS[1]})`
                  : skin.head,
                boxShadow: hasShield
                  ? `0 0 0 3px #60d4f5, 0 0 20px rgba(96,212,245,0.7)`
                  : `0 2px 10px ${skin.glow}`
              }}
            >
              <div className="snake-head-eyes">
                <span className="snake-eye eye-left" />
                <span className="snake-eye eye-right" />
              </div>
            </div>
          );
        }

        let segColor;
        if (skin.isRainbow) {
          segColor = RAINBOW_COLORS[index % RAINBOW_COLORS.length];
        } else {
          // Gradient fade: bodyA → bodyB toward tail
          const t = index / Math.max(total - 1, 1);
          // Simple lerp between two hex colors via hsl
          const progress = Math.min(t, 0.9);
          const hA = parseFloat(skin.bodyA.replace('#', '').slice(0, 2), 16);
          // Just interpolate opacity; use bodyA for front, bodyB for back
          segColor = index < total / 2 ? skin.bodyA : skin.bodyB;
          void hA; // suppress lint
          void progress;
        }

        return (
          <div
            key={`body-${index}`}
            className="snake-segment snake-body"
            style={{
              left: `${segment.x * 5}%`,
              top: `${segment.y * 5}%`,
              background: segColor,
              opacity: Math.max(0.5, 1 - (index / total) * 0.5),
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          />
        );
      })}
    </>
  );
};
