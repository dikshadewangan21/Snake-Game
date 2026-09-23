import { useRef, useCallback } from 'react';

export const useSwipe = (onSwipe) => {
  const touchStartRef = useRef({ x: 0, y: 0 });

  const onTouchStart = useCallback((e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  }, []);

  const onTouchEnd = useCallback((e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;

    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    const minThreshold = 25; // minimum px swipe distance

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minThreshold) {
        onSwipe(deltaX > 0 ? 'RIGHT' : 'LEFT');
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minThreshold) {
        onSwipe(deltaY > 0 ? 'DOWN' : 'UP');
      }
    }
  }, [onSwipe]);

  return { onTouchStart, onTouchEnd };
};
