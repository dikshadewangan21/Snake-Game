import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { THEMES } from '../utils/themes';

export const Settings = ({ settings, onUpdateSettings, onClose, onResetData }) => {
  const toggleSfx = () => {
    soundManager.playClick();
    const next = !settings.sfxEnabled;
    soundManager.setSfxEnabled(next);
    onUpdateSettings({ sfxEnabled: next });
  };

  const toggleMusic = () => {
    soundManager.playClick();
    const next = !settings.musicEnabled;
    soundManager.setMusicEnabled(next);
    onUpdateSettings({ musicEnabled: next });
  };

  const handleReset = () => {
    if (window.confirm('Reset all high scores, combos, and achievements?')) {
      onResetData();
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="modal-title">⚙️ Settings</h2>
          <button className="btn-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="settings-group">
          {/* Sound Effects */}
          <div className="settings-row">
            <div className="settings-label-wrap">
              <span className="settings-title">🔊 Sound Effects</span>
              <span className="settings-subtitle">Bites, chimes & crunch</span>
            </div>
            <div
              className={`toggle-switch ${settings.sfxEnabled ? 'active' : ''}`}
              onClick={toggleSfx}
              role="switch"
              aria-checked={settings.sfxEnabled}
            >
              <div className="toggle-knob" />
            </div>
          </div>

          {/* Music */}
          <div className="settings-row">
            <div className="settings-label-wrap">
              <span className="settings-title">🎵 Background Music</span>
              <span className="settings-subtitle">Retro chiptune loop</span>
            </div>
            <div
              className={`toggle-switch ${settings.musicEnabled ? 'active' : ''}`}
              onClick={toggleMusic}
              role="switch"
              aria-checked={settings.musicEnabled}
            >
              <div className="toggle-knob" />
            </div>
          </div>

          {/* Reset */}
          <div className="settings-row" style={{ marginTop: 4 }}>
            <div className="settings-label-wrap">
              <span className="settings-title">🗑️ Reset Progress</span>
              <span className="settings-subtitle">Clears all scores & data</span>
            </div>
            <button
              className="btn-secondary"
              style={{ width: 'auto', padding: '6px 14px', fontSize: '12px', color: '#dc2626', borderColor: '#fca5a5' }}
              onClick={handleReset}
            >
              <RotateCcw size={13} /> RESET
            </button>
          </div>
        </div>

        <div className="modal-actions-col">
          <button className="btn-primary" onClick={onClose}>DONE ✓</button>
        </div>
      </div>
    </div>
  );
};
