import React from 'react';
import { X, Trophy, Lock } from 'lucide-react';
import { ACHIEVEMENTS } from '../utils/constants';

export const AchievementsModal = ({ unlockedIds = [], onClose }) => {
  const total = ACHIEVEMENTS.length;
  const unlockedCount = unlockedIds.length;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="modal-title">
            <Trophy size={18} color="var(--accent-gold)" /> ACHIEVEMENTS ({unlockedCount}/{total})
          </h2>
          <button className="btn-close" onClick={onClose} aria-label="Close Achievements">
            <X size={18} />
          </button>
        </div>

        <div className="achievements-list">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedIds.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="achievement-icon">
                  {isUnlocked ? ach.icon : <Lock size={20} color="var(--text-muted)" />}
                </div>
                <div className="achievement-info">
                  <span className="achievement-card-title">{ach.title}</span>
                  <span className="achievement-card-desc">{ach.desc}</span>
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
