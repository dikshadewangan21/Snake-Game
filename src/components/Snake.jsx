import React from 'react';

export const Snake = ({ segments, direction, hasShield }) => {
  const getDirectionClass = () => {
    if (!direction) return 'head-up';
    if (direction.x === 1)  return 'head-right';
    if (direction.x === -1) return 'head-left';
    if (direction.y === 1)  return 'head-down';
    return 'head-up';
  };

  const dirClass = getDirectionClass();
  const total = segments.length;

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
                top:  `${segment.y * 5}%`
              }}
            >
              <div className="snake-head-eyes">
                <span className="snake-eye eye-left" />
                <span className="snake-eye eye-right" />
              </div>
            </div>
          );
        }

        // Body: gradient from darker green at front to lighter at tail
        const progress = index / Math.max(total - 1, 1);
        const greenVal = Math.round(45 + progress * 30); // shift hue slightly
        const bodyBg = `hsl(${140 - progress * 10}, ${62 - progress * 10}%, ${greenVal}%)`;

        return (
          <div
            key={`body-${index}`}
            className="snake-segment snake-body"
            style={{
              left: `${segment.x * 5}%`,
              top:  `${segment.y * 5}%`,
              background: bodyBg,
              opacity: Math.max(0.55, 1 - (index / total) * 0.45)
            }}
          />
        );
      })}
    </>
  );
};
