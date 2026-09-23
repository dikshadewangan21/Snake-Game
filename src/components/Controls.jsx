import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

export const Controls = ({ onDirectionChange }) => {
  return (
    <div className="controls-container">
      {/* Virtual D-pad for mobile / touch */}
      <div className="dpad-container">
        <button
          className="dpad-btn dpad-up"
          onClick={() => onDirectionChange('UP')}
          aria-label="Move Up"
        >
          <ArrowUp size={22} />
        </button>

        <button
          className="dpad-btn dpad-left"
          onClick={() => onDirectionChange('LEFT')}
          aria-label="Move Left"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="dpad-center">PAD</div>

        <button
          className="dpad-btn dpad-right"
          onClick={() => onDirectionChange('RIGHT')}
          aria-label="Move Right"
        >
          <ArrowRight size={22} />
        </button>

        <button
          className="dpad-btn dpad-down"
          onClick={() => onDirectionChange('DOWN')}
          aria-label="Move Down"
        >
          <ArrowDown size={22} />
        </button>
      </div>

      {/* Keyboard shortcuts hints for desktop */}
      <div className="keyboard-hints">
        <span>
          <span className="kbd">W A S D</span> or <span className="kbd">ARROWS</span> Move
        </span>
        <span>
          <span className="kbd">SPACE</span> Pause
        </span>
      </div>
    </div>
  );
};
