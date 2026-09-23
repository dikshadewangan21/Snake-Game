import React, { useEffect, useState } from 'react';
import { soundManager } from '../utils/audio';

export const Countdown = ({ onComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    soundManager.playCountdown(false);

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          soundManager.playCountdown(true);
          return 'GO!';
        }
        if (prev === 'GO!') {
          clearInterval(timer);
          onComplete();
          return null;
        }
        soundManager.playCountdown(false);
        return prev - 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!count) return null;

  return (
    <div className="countdown-overlay">
      <div key={count} className="countdown-number">
        {count}
      </div>
      <div className="countdown-label">
        {count === 'GO!' ? '🐍 GOOD LUCK!' : 'GET READY...'}
      </div>
    </div>
  );
};
