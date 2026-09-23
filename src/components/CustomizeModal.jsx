import React from 'react';
import { X } from 'lucide-react';
import { THEMES, SNAKE_SKINS } from '../utils/themes';
import { soundManager } from '../utils/audio';

export const CustomizeModal = ({ settings, onUpdateSettings, onClose }) => {
  const currentTheme = settings.theme || 'fresh-garden';
  const currentSkin = settings.skin || 'classic';

  const handleTheme = (themeId) => {
    soundManager.playClick();
    onUpdateSettings({ theme: themeId });
  };

  const handleSkin = (skinId) => {
    soundManager.playClick();
    onUpdateSettings({ skin: skinId });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="modal-title">🎨 Customize</h2>
          <button className="btn-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Theme Grid */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: 10 }}>
            🌍 Game Theme
          </p>
          <div className="theme-grid">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                className={`theme-card ${currentTheme === theme.id ? 'selected' : ''}`}
                onClick={() => handleTheme(theme.id)}
                title={theme.desc}
              >
                <span className="theme-card-icon">{theme.icon}</span>
                <span className="theme-card-name">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Snake Skin Grid */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: 10 }}>
            🐍 Snake Skin
          </p>
          <div className="skin-grid">
            {SNAKE_SKINS.map((skin) => (
              <button
                key={skin.id}
                className={`skin-card ${currentSkin === skin.id ? 'selected' : ''}`}
                onClick={() => handleSkin(skin.id)}
              >
                <div className="skin-preview">
                  <span style={{ background: skin.head, width: 12, height: 12, borderRadius: '50%', display: 'inline-block' }} />
                  <span style={{ background: skin.bodyA, width: 10, height: 10, borderRadius: '50%', display: 'inline-block' }} />
                  <span style={{ background: skin.bodyB, width: 8, height: 8, borderRadius: '50%', display: 'inline-block' }} />
                </div>
                <span className="skin-card-icon">{skin.icon}</span>
                <span className="skin-card-name">{skin.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button className="btn-primary" onClick={onClose}>DONE ✓</button>
      </div>
    </div>
  );
};
