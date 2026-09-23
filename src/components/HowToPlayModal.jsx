import React from 'react';
import { X, HelpCircle, Gamepad2, Apple, Zap } from 'lucide-react';
import { FOOD_TYPES, POWER_UPS } from '../utils/constants';

export const HowToPlayModal = ({ onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-card" style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <h2 className="modal-title">
            <HelpCircle size={18} color="var(--accent-cyan)" /> HOW TO PLAY
          </h2>
          <button className="btn-close" onClick={onClose} aria-label="Close Guide">
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
          {/* Controls */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-arcade)', fontSize: '10px', color: 'var(--accent-gold)', marginBottom: '6px' }}>
              🎮 CONTROLS
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              • <strong>Desktop:</strong> Use <span className="kbd">W A S D</span> or <span className="kbd">ARROWS</span> to steer, <span className="kbd">SPACE</span> to Pause, <span className="kbd">ENTER</span> to Start/Restart.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.4', marginTop: '4px' }}>
              • <strong>Mobile:</strong> Swipe anywhere across the board or tap the on-screen D-Pad.
            </p>
          </div>

          {/* Foods */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-arcade)', fontSize: '10px', color: 'var(--accent-gold)', marginBottom: '6px' }}>
              🍎 FOOD TYPES
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {Object.values(FOOD_TYPES).map((f) => (
                <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{f.name}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>+{f.points} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Power-ups */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-arcade)', fontSize: '10px', color: 'var(--accent-gold)', marginBottom: '6px' }}>
              ⚡ POWER-UPS
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {Object.values(POWER_UPS).map((p) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{p.icon}</span>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{p.name}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{p.effect}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-actions-col">
          <button className="btn-primary" onClick={onClose}>
            GOT IT!
          </button>
        </div>
      </div>
    </div>
  );
};
