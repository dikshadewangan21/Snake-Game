import React, { useMemo } from 'react';

/**
 * GameBackground
 * Premium casual arcade game background with:
 * - Multi-layered animated vibrant gradients
 * - Soft drifting ambient orbs
 * - Subtle geometric pattern texture
 * - Floating decorative game shapes (diamonds, stars, bubbles)
 * - Contrast-protecting center focus vignette
 */
export const GameBackground = () => {
  // Generate a deterministic set of floating decorative particles
  const particles = useMemo(() => [
    { id: 1, type: 'diamond', char: '✦', left: '8%',  top: '18%', size: 18, delay: '0s',  duration: '16s', opacity: 0.28 },
    { id: 2, type: 'bubble',  char: '',  left: '22%', top: '75%', size: 24, delay: '3s',  duration: '20s', opacity: 0.20 },
    { id: 3, type: 'star',    char: '★', left: '85%', top: '15%', size: 16, delay: '1s',  duration: '18s', opacity: 0.30 },
    { id: 4, type: 'sparkle', char: '✧', left: '78%', top: '65%', size: 20, delay: '4s',  duration: '22s', opacity: 0.25 },
    { id: 5, type: 'cross',   char: '+', left: '14%', top: '42%', size: 16, delay: '6s',  duration: '15s', opacity: 0.22 },
    { id: 6, type: 'bubble',  char: '',  left: '92%', top: '40%', size: 32, delay: '2s',  duration: '24s', opacity: 0.16 },
    { id: 7, type: 'diamond', char: '◆', left: '30%', top: '12%', size: 14, delay: '5s',  duration: '17s', opacity: 0.25 },
    { id: 8, type: 'star',    char: '★', left: '65%', top: '82%', size: 15, delay: '7s',  duration: '19s', opacity: 0.26 },
    { id: 9, type: 'sparkle', char: '✦', left: '4%',  top: '88%', size: 22, delay: '8s',  duration: '21s', opacity: 0.22 },
    { id: 10, type: 'bubble', char: '',  left: '70%', top: '28%', size: 20, delay: '9s',  duration: '18s', opacity: 0.18 },
    { id: 11, type: 'cross',  char: '+', left: '50%', top: '92%', size: 14, delay: '11s', duration: '16s', opacity: 0.20 },
    { id: 12, type: 'sparkle',char: '✧', left: '38%', top: '85%', size: 18, delay: '10s', duration: '23s', opacity: 0.24 }
  ], []);

  return (
    <div className="game-bg-root" aria-hidden="true">
      {/* 1. Dynamic animated gradient mesh */}
      <div className="bg-gradient-mesh" />

      {/* 2. Soft drifting ambient light orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-orb bg-orb-4" />

      {/* 3. Subtle micro-pattern grid texture */}
      <div className="bg-pattern-grid" />

      {/* 4. Floating decorative game-style particles */}
      <div className="bg-particles-container">
        {particles.map((p) => (
          <span
            key={p.id}
            className={`bg-particle bg-particle-${p.type}`}
            style={{
              left: p.left,
              top: p.top,
              fontSize: p.char ? `${p.size}px` : undefined,
              width: !p.char ? `${p.size}px` : undefined,
              height: !p.char ? `${p.size}px` : undefined,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: p.opacity
            }}
          >
            {p.char}
          </span>
        ))}
      </div>

      {/* 5. Center contrast shield ensuring crisp UI readability */}
      <div className="bg-center-vignette" />
    </div>
  );
};
