import React, { useState, useEffect } from 'react';
import { useSnakeGame } from './hooks/useSnakeGame';
import { useSwipe } from './hooks/useSwipe';
import { GameBoard } from './components/GameBoard';
import { GameHUD } from './components/GameHUD';
import { Controls } from './components/Controls';
import { MainMenu } from './components/MainMenu';
import { PauseMenu } from './components/PauseMenu';
import { GameOver } from './components/GameOver';
import { Settings } from './components/Settings';
import { CustomizeModal } from './components/CustomizeModal';
import { AchievementsModal } from './components/AchievementsModal';
import { MissionsModal } from './components/MissionsModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { Countdown } from './components/Countdown';
import { GameBackground } from './components/GameBackground';
import { ACHIEVEMENTS } from './utils/constants';
import { getStoredSettings, saveStoredSettings } from './utils/storage';
import { soundManager } from './utils/audio';

import './styles/App.css';
import './styles/GameBoard.css';
import './styles/HUD.css';
import './styles/MainMenu.css';
import './styles/Modals.css';
import './styles/Controls.css';

export function App() {
  const [settings, setSettings] = useState(getStoredSettings);
  const [showSettings, setShowSettings] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showMissions, setShowMissions] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const {
    gameState,
    setGameState,
    mode,
    setMode,
    snake,
    direction,
    changeDirection,
    food,
    powerUp,
    obstacles,
    score,
    highScores,
    bestCombo,
    level,
    combo,
    highestCombo,
    comboProgress,
    remainingTime,
    lives,
    activeEffects,
    sessionStats,
    levelUpNotice,
    burstEffect,
    toastAchievement,
    isNewHigh,
    unlockedAchievements,
    scorePopups,
    startGame,
    togglePause,
    onCountdownComplete
  } = useSnakeGame();

  const { onTouchStart, onTouchEnd } = useSwipe(changeDirection);

  // Dynamically apply selected theme to root HTML element
  useEffect(() => {
    const activeTheme = settings.theme || 'fresh-garden';
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [settings.theme]);

  // Sync audio settings
  useEffect(() => {
    soundManager.setSfxEnabled(settings.sfxEnabled);
    soundManager.setMusicEnabled(settings.musicEnabled);
  }, [settings.sfxEnabled, settings.musicEnabled]);

  const updateSettings = (partial) => {
    const updated = saveStoredSettings(partial);
    setSettings(updated);
  };

  const handleResetData = () => {
    localStorage.clear();
    setSettings(getStoredSettings());
    window.location.reload();
  };

  const currentToast = toastAchievement
    ? ACHIEVEMENTS.find((a) => a.id === toastAchievement)
    : null;

  return (
    <div className="app-container">
      {/* Dynamic Animated Game Background */}
      <GameBackground />

      {/* Achievement Toast */}
      {currentToast && (
        <div className="achievement-toast">
          <span className="toast-icon">{currentToast.icon}</span>
          <div className="toast-content">
            <div className="toast-title">Achievement Unlocked!</div>
            <div className="toast-desc">{currentToast.title}</div>
          </div>
        </div>
      )}

      {/* Main Menu */}
      {gameState === 'MENU' && (
        <MainMenu
          selectedMode={mode}
          onSelectMode={setMode}
          onStartGame={() => startGame(mode)}
          highScores={highScores}
          onOpenAchievements={() => setShowAchievements(true)}
          onOpenMissions={() => setShowMissions(true)}
          onOpenCustomize={() => setShowCustomize(true)}
          onOpenSettings={() => setShowSettings(true)}
          onOpenHowToPlay={() => setShowHowToPlay(true)}
        />
      )}

      {/* Game View (Countdown, Playing, Paused, GameOver) */}
      {(gameState === 'COUNTDOWN' ||
        gameState === 'PLAYING' ||
        gameState === 'PAUSED' ||
        gameState === 'GAMEOVER') && (
        <div className="game-layout">
          <GameHUD
            score={score}
            highScore={highScores[mode] || 0}
            level={level}
            mode={mode}
            combo={combo}
            comboProgress={comboProgress}
            activeEffects={activeEffects}
            lives={lives}
            remainingTime={remainingTime}
            isPaused={gameState === 'PAUSED'}
            onPauseToggle={togglePause}
            sfxEnabled={settings.sfxEnabled}
            onSfxToggle={() => updateSettings({ sfxEnabled: !settings.sfxEnabled })}
          />

          <div style={{ position: 'relative' }}>
            <GameBoard
              snake={snake}
              direction={direction}
              food={food}
              powerUp={powerUp}
              obstacles={obstacles}
              hasShield={activeEffects.SHIELD}
              levelUpNotice={levelUpNotice}
              level={level}
              burstEffect={burstEffect}
              scorePopups={scorePopups}
              skinId={settings.skin || 'classic'}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            />
            {gameState === 'COUNTDOWN' && (
              <Countdown onComplete={onCountdownComplete} />
            )}
          </div>

          <Controls onDirectionChange={changeDirection} />
        </div>
      )}

      {/* Pause Menu */}
      {gameState === 'PAUSED' && (
        <PauseMenu
          onResume={togglePause}
          onRestart={() => startGame(mode)}
          onOpenSettings={() => setShowSettings(true)}
          onQuitToMenu={() => setGameState('MENU')}
        />
      )}

      {/* Game Over Modal */}
      {gameState === 'GAMEOVER' && (
        <GameOver
          score={score}
          highScore={highScores[mode] || 0}
          isNewHigh={isNewHigh}
          level={level}
          foodsEaten={sessionStats.foodsEaten}
          highestCombo={highestCombo}
          mode={mode}
          onPlayAgain={() => startGame(mode)}
          onChangeMode={() => setGameState('MENU')}
          onMainMenu={() => setGameState('MENU')}
        />
      )}

      {/* Customize Modal (Themes & Snake Skins) */}
      {showCustomize && (
        <CustomizeModal
          settings={settings}
          onUpdateSettings={updateSettings}
          onClose={() => setShowCustomize(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          settings={settings}
          onUpdateSettings={updateSettings}
          onClose={() => setShowSettings(false)}
          onResetData={handleResetData}
        />
      )}

      {/* Achievements Modal */}
      {showAchievements && (
        <AchievementsModal
          unlockedIds={unlockedAchievements}
          onClose={() => setShowAchievements(false)}
        />
      )}

      {/* Missions Modal */}
      {showMissions && (
        <MissionsModal
          currentStats={{
            foodsEaten: sessionStats.foodsEaten,
            goldenEaten: sessionStats.goldenEaten,
            score,
            level,
            combo
          }}
          onClose={() => setShowMissions(false)}
        />
      )}

      {/* Guide / How to Play Modal */}
      {showHowToPlay && (
        <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
      )}
    </div>
  );
}

export default App;
