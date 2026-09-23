import React from 'react';
import { X, Target, CheckCircle2 } from 'lucide-react';
import { MISSIONS_LIST } from '../utils/constants';

export const MissionsModal = ({ currentStats, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="modal-title">
            <Target size={18} color="var(--accent-cyan)" /> MISSIONS & CHALLENGES
          </h2>
          <button className="btn-close" onClick={onClose} aria-label="Close Missions">
            <X size={18} />
          </button>
        </div>

        <div className="achievements-list">
          {MISSIONS_LIST.map((m) => {
            const currentVal = currentStats[m.key] || 0;
            const isCompleted = currentVal >= m.target;
            const progressPct = Math.min(100, Math.round((currentVal / m.target) * 100));

            return (
              <div
                key={m.id}
                className={`achievement-card ${isCompleted ? 'unlocked' : ''}`}
                style={{ flexDirection: 'column', alignItems: 'stretch', gap: '6px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="achievement-card-title">{m.title}</span>
                  {isCompleted ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-lime)', fontSize: '11px', fontWeight: 700 }}>
                      <CheckCircle2 size={14} /> DONE
                    </span>
                  ) : (
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {currentVal} / {m.target}
                    </span>
                  )}
                </div>
                <span className="achievement-card-desc">{m.desc}</span>

                {/* Progress bar */}
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${progressPct}%`,
                      background: isCompleted ? 'var(--accent-lime)' : 'var(--accent-cyan)',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="modal-actions-col">
          <button className="btn-primary" onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
