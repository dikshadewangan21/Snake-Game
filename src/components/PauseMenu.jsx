import React from 'react';
import { Play, RotateCcw, Settings, Home } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const PauseMenu = ({ onResume, onRestart, onOpenSettings, onQuitToMenu }) => {
  const handleAction = (cb) => {
    soundManager.playClick();
    cb();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="modal-title">⏸️ Paused</h2>
        </div>

        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', fontWeight: 700 }}>
          Your snake is waiting... 🐍
        </div>

        <div className="modal-actions-col">
          <button className="btn-primary" onClick={() => handleAction(onResume)}>
            <Play size={18} /> RESUME
          </button>
          <button className="btn-secondary" onClick={() => handleAction(onRestart)}>
            <RotateCcw size={16} /> RESTART
          </button>
          <button className="btn-secondary" onClick={() => handleAction(onOpenSettings)}>
            <Settings size={16} /> SETTINGS
          </button>
          <button className="btn-secondary" onClick={() => handleAction(onQuitToMenu)}>
            <Home size={16} /> QUIT TO MENU
          </button>
        </div>
      </div>
    </div>
  );
};
