import React from 'react';
import { Play, Trophy, Target, Settings as SettingsIcon, HelpCircle, Palette } from 'lucide-react';
import { GAME_MODES } from '../utils/constants';
import { soundManager } from '../utils/audio';

export const MainMenu = ({
  selectedMode,
  onSelectMode,
  onStartGame,
  highScores,
  onOpenAchievements,
  onOpenMissions,
  onOpenSettings,
  onOpenHowToPlay,
  onOpenCustomize
}) => {
  const handleModeClick = (modeId) => {
    soundManager.playClick();
    onSelectMode(modeId);
  };

  const handlePlayClick = () => {
    soundManager.playClick();
    onStartGame();
  };

  const handleNavClick = (callback) => {
    soundManager.playClick();
    callback();
  };

  return (
    <div className="menu-wrapper">
      <div className="menu-container">
        {/* Header */}
        <div className="menu-header">
          <span className="brand-badge">🕹️ ARCADE GAME</span>
          <h1 className="game-title">Snake Game</h1>
          <p className="game-subtitle">Eat. Grow. Survive.</p>
        </div>

        {/* Mode Selection */}
        <div className="mode-section">
          <span className="section-label">Select Game Mode</span>
          <div className="mode-grid">
            {Object.values(GAME_MODES).map((gmode) => {
              const isSelected = selectedMode === gmode.id;
              const best = highScores[gmode.id] || 0;
              return (
                <div
                  key={gmode.id}
                  className={`mode-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleModeClick(gmode.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleModeClick(gmode.id)}
                >
                  <div className="mode-card-header">
                    <span className="mode-icon">{gmode.icon}</span>
                    <span className="mode-name">{gmode.name}</span>
                  </div>
                  <p className="mode-desc">{gmode.tagline}</p>
                  {best > 0 && (
                    <span className="mode-best-score">🏆 {best}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Hero Play Button */}
        <button className="btn-play-hero" onClick={handlePlayClick} autoFocus>
          <Play size={22} fill="currentColor" /> PLAY
        </button>

        {/* Footer Nav */}
        <div className="menu-footer-actions">
          <button className="btn-menu-icon" onClick={() => handleNavClick(onOpenAchievements)}>
            <Trophy size={20} />
            <span>Trophies</span>
          </button>
          <button className="btn-menu-icon" onClick={() => handleNavClick(onOpenMissions)}>
            <Target size={20} />
            <span>Missions</span>
          </button>
          <button className="btn-menu-icon" onClick={() => handleNavClick(onOpenCustomize)}>
            <Palette size={20} />
            <span>Customize</span>
          </button>
          <button className="btn-menu-icon" onClick={() => handleNavClick(onOpenHowToPlay)}>
            <HelpCircle size={20} />
            <span>Guide</span>
          </button>
          <button className="btn-menu-icon" onClick={() => handleNavClick(onOpenSettings)}>
            <SettingsIcon size={20} />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};
