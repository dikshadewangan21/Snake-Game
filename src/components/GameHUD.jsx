import React from 'react';
import { Pause, Volume2, VolumeX } from 'lucide-react';
import { POWER_UPS } from '../utils/constants';

export const GameHUD = ({
  score,
  highScore,
  level,
  mode,
  combo,
  comboProgress,
  activeEffects,
  lives,
  remainingTime,
  isPaused,
  onPauseToggle,
  sfxEnabled,
  onSfxToggle
}) => {
  const isTimeChallenge = mode === 'TIME_CHALLENGE';

  const buffItems = [];
  if (activeEffects.SHIELD)          buffItems.push({ id: 'SHIELD',     icon: '🛡️', label: 'SHIELD' });
  if (activeEffects.SCORE_X3 > 0)    buffItems.push({ id: 'SCORE_X3',   icon: '🌟', label: `${activeEffects.SCORE_X3}s` });
  if (activeEffects.SLOW_MO > 0)     buffItems.push({ id: 'SLOW_MO',    icon: '⏱️', label: `${activeEffects.SLOW_MO}s` });
  if (activeEffects.SPEED_BOOST > 0) buffItems.push({ id: 'SPEED_BOOST',icon: '🚀', label: `${activeEffects.SPEED_BOOST}s` });
  if (activeEffects.MAGNET > 0)      buffItems.push({ id: 'MAGNET',     icon: '🧲', label: `${activeEffects.MAGNET}s` });
  if (activeEffects.MULTIPLIER_FOOD > 0) buffItems.push({ id: 'MULTIPLIER', icon: '✨', label: `${activeEffects.MULTIPLIER_FOOD}s` });

  return (
    <div className="game-hud">
      {/* Top Row */}
      <div className="hud-top-row">
        <div className="hud-stats-group">
          <div className="hud-stat-box">
            <span className="hud-stat-label">🍎 Score</span>
            <span className="hud-stat-val score">{score}</span>
          </div>

          <div className="hud-stat-box">
            <span className="hud-stat-label">🏆 Best</span>
            <span className="hud-stat-val high">{highScore}</span>
          </div>

          {isTimeChallenge && (
            <div className="hud-stat-box">
              <span className="hud-stat-label">⏳ Time</span>
              <span className={`hud-stat-val ${remainingTime <= 15 ? 'timer-danger' : ''}`}>
                {remainingTime}s
              </span>
            </div>
          )}
        </div>

        <div className="hud-center-badge">
          <span className="hud-badge-title">⭐ LVL {level}</span>
        </div>

        <div className="hud-actions-group">
          <button
            className="hud-btn-icon"
            onClick={onSfxToggle}
            aria-label="Toggle Sound"
            title={sfxEnabled ? 'Mute Sound' : 'Unmute Sound'}
          >
            {sfxEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            className="hud-btn-icon"
            onClick={onPauseToggle}
            aria-label="Pause / Resume Game"
            title="Pause"
          >
            <Pause size={16} />
          </button>
        </div>
      </div>

      {/* Sub Row: Combo Bar + Buffs */}
      <div className="hud-sub-row">
        <div className="combo-container">
          <span className="combo-tag">
            {combo > 1 ? `🔥 ×${combo}` : '🔥 Combo'}
          </span>
          <div className="combo-bar-wrap">
            <div className="combo-bar-fill" style={{ width: `${comboProgress}%` }} />
          </div>
        </div>

        <div className="active-buffs-list">
          {lives > 0 && (
            <div className="buff-pill">
              ❤️ <span className="buff-timer">×{lives}</span>
            </div>
          )}
          {buffItems.map((buff) => (
            <div key={buff.id} className="buff-pill">
              <span>{buff.icon}</span>
              <span className="buff-timer">{buff.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
