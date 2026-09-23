import React, { useEffect } from 'react';
import { RotateCcw, LayoutGrid, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import { GAME_MODES } from '../utils/constants';

export const GameOver = ({
  score,
  highScore,
  isNewHigh,
  level,
  foodsEaten,
  highestCombo,
  mode,
  onPlayAgain,
  onChangeMode,
  onMainMenu
}) => {
  useEffect(() => {
    if (isNewHigh && score > 0) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          colors: ['#4eca72', '#ffd700', '#ff5555', '#ffffff'],
          origin: { y: 0.55 }
        });
      } catch {
        // safe fail
      }
    }
  }, [isNewHigh, score]);

  const modeData = GAME_MODES[mode] || GAME_MODES.CLASSIC;

  const handleAction = (cb) => {
    soundManager.playClick();
    cb();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="modal-title">GAME OVER! 🐍</h2>
        </div>

        {/* Score Banner */}
        <div className="gameover-score-banner">
          {isNewHigh && (
            <div className="new-high-badge">🎉 NEW HIGH SCORE! 🎉</div>
          )}
          <div className="gameover-score-num">{score}</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>
            {modeData.icon} {modeData.name} Mode
          </div>
        </div>

        {/* Stats Grid */}
        <div className="gameover-stats-grid">
          <div className="stat-item">
            <span className="stat-item-label">🏆 High Score</span>
            <span className="stat-item-value" style={{ color: 'var(--accent-gold)' }}>{highScore}</span>
          </div>
          <div className="stat-item">
            <span className="stat-item-label">⭐ Level</span>
            <span className="stat-item-value">{level}</span>
          </div>
          <div className="stat-item">
            <span className="stat-item-label">🍎 Food Eaten</span>
            <span className="stat-item-value">{foodsEaten}</span>
          </div>
          <div className="stat-item">
            <span className="stat-item-label">🔥 Best Combo</span>
            <span className="stat-item-value" style={{ color: 'var(--accent-orange)' }}>×{highestCombo}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="modal-actions-col">
          <button className="btn-primary" onClick={() => handleAction(onPlayAgain)}>
            <RotateCcw size={16} /> PLAY AGAIN
          </button>
          <button className="btn-secondary" onClick={() => handleAction(onChangeMode)}>
            <LayoutGrid size={16} /> CHANGE MODE
          </button>
          <button className="btn-secondary" onClick={() => handleAction(onMainMenu)}>
            <Home size={16} /> MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
};
