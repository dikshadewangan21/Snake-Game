import { useState, useEffect, useRef, useCallback } from 'react';
import {
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  DIRECTIONS,
  OPPOSITES,
  GAME_MODES,
  COMBO_TIMEOUT,
  FOOD_TYPES,
  POWER_UPS
} from '../utils/constants';
import {
  checkWallCollision,
  checkSelfCollision,
  checkObstacleCollision,
  wrapCoordinates,
  isSamePosition,
  getDistance
} from '../utils/collision';
import { spawnFood, spawnPowerUp } from '../utils/food';
import {
  calculateSpeed,
  calculateLevel,
  calculateScoreGain,
  generateObstacles,
  applyMagnetPull
} from '../utils/gameLogic';
import {
  getStoredHighScores,
  saveHighScore,
  getStoredBestCombo,
  saveBestCombo,
  getStoredAchievements,
  unlockAchievement,
  updateStoredStats
} from '../utils/storage';
import { soundManager } from '../utils/audio';

export const useSnakeGame = () => {
  // Game states
  const [gameState, setGameState] = useState('MENU'); // MENU | COUNTDOWN | PLAYING | PAUSED | GAMEOVER
  const [mode, setMode] = useState('CLASSIC');
  const [highScores, setHighScores] = useState(getStoredHighScores);
  const [bestCombo, setBestCombo] = useState(getStoredBestCombo);
  const [unlockedAchievements, setUnlockedAchievements] = useState(getStoredAchievements);

  // Snake & Board
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const directionQueueRef = useRef([]);

  const [food, setFood] = useState(null);
  const [powerUp, setPowerUp] = useState(null);
  const [obstacles, setObstacles] = useState([]);

  // Stats & Progress
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(1);
  const [highestCombo, setHighestCombo] = useState(1);
  const [comboProgress, setComboProgress] = useState(100);
  const [remainingTime, setRemainingTime] = useState(75);
  const [lives, setLives] = useState(0);

  // Active timed buffs
  const [activeEffects, setActiveEffects] = useState({
    SHIELD: false,
    SCORE_X3: 0,
    SLOW_MO: 0,
    SPEED_BOOST: 0,
    MAGNET: 0,
    SPEED_FOOD: 0,
    SLOW_FOOD: 0,
    MULTIPLIER_FOOD: 0
  });

  // Session trackers
  const [sessionStats, setSessionStats] = useState({
    foodsEaten: 0,
    goldenEaten: 0,
    rainbowEaten: 0
  });

  // UI Event Triggers
  const [levelUpNotice, setLevelUpNotice] = useState(false);
  const [burstEffect, setBurstEffect] = useState(null);
  const [toastAchievement, setToastAchievement] = useState(null);
  const [isNewHigh, setIsNewHigh] = useState(false);

  // Refs for loop
  const comboTimerRef = useRef(null);
  const comboStartRef = useRef(null);
  const magnetTickRef = useRef(0);
  const survivalTimerRef = useRef(null);

  // Trigger achievement unlock with toast notification
  const triggerUnlock = useCallback((achievementId) => {
    const isNew = unlockAchievement(achievementId);
    if (isNew) {
      setUnlockedAchievements(getStoredAchievements());
      soundManager.playPowerUp();
      setToastAchievement(achievementId);
      setTimeout(() => setToastAchievement(null), 3500);
    }
  }, []);

  // Initialize a fresh game session
  const startGame = useCallback((selectedMode) => {
    const activeMode = selectedMode || mode;
    setMode(activeMode);
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionQueueRef.current = [];
    setScore(0);
    setLevel(1);
    setCombo(1);
    setHighestCombo(1);
    setComboProgress(100);
    setLives(0);
    setIsNewHigh(false);

    setActiveEffects({
      SHIELD: false,
      SCORE_X3: 0,
      SLOW_MO: 0,
      SPEED_BOOST: 0,
      MAGNET: 0,
      SPEED_FOOD: 0,
      SLOW_FOOD: 0,
      MULTIPLIER_FOOD: 0
    });

    setSessionStats({
      foodsEaten: 0,
      goldenEaten: 0,
      rainbowEaten: 0
    });

    const initialObstacles = activeMode === 'SURVIVAL' ? generateObstacles(1, INITIAL_SNAKE) : [];
    setObstacles(initialObstacles);

    const firstFood = spawnFood([...INITIAL_SNAKE, ...initialObstacles]);
    setFood(firstFood);
    setPowerUp(null);

    if (activeMode === 'TIME_CHALLENGE') {
      setRemainingTime(GAME_MODES.TIME_CHALLENGE.initialSeconds);
    }

    setGameState('COUNTDOWN');
  }, [mode]);

  const onCountdownComplete = useCallback(() => {
    setGameState('PLAYING');
  }, []);

  // Direction Change Handler (Queued to prevent skipping / self-reversing)
  const changeDirection = useCallback((dirKey) => {
    const targetDir = DIRECTIONS[dirKey];
    if (!targetDir) return;

    const lastQueued = directionQueueRef.current.length > 0
      ? directionQueueRef.current[directionQueueRef.current.length - 1]
      : direction;

    // Prevent immediate 180-degree turnaround
    if (OPPOSITES[targetDir.name] === lastQueued.name || targetDir.name === lastQueued.name) {
      return;
    }

    // Keep buffer tight (max 2 queued turns)
    if (directionQueueRef.current.length < 2) {
      directionQueueRef.current.push(targetDir);
    }
  }, [direction]);

  // Combo Reset / Decay
  const resetComboTimer = useCallback(() => {
    if (comboTimerRef.current) clearInterval(comboTimerRef.current);
    comboStartRef.current = Date.now();
    setComboProgress(100);

    comboTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - comboStartRef.current;
      const pct = Math.max(0, 100 - (elapsed / COMBO_TIMEOUT) * 100);
      setComboProgress(pct);

      if (pct <= 0) {
        clearInterval(comboTimerRef.current);
        comboTimerRef.current = null;
        setCombo(1);
      }
    }, 60);
  }, []);

  // Game Over Sequence
  const handleGameOver = useCallback(() => {
    soundManager.playGameOver();
    setGameState('GAMEOVER');

    if (comboTimerRef.current) {
      clearInterval(comboTimerRef.current);
      comboTimerRef.current = null;
    }

    const { isNewHigh: isNew, newScore } = saveHighScore(mode, score);
    setIsNewHigh(isNew);
    setHighScores(getStoredHighScores());

    const savedCombo = saveBestCombo(highestCombo);
    setBestCombo(savedCombo);

    // Update lifetime stats
    updateStoredStats({
      games: 1,
      score,
      goldenApples: sessionStats.goldenEaten,
      rainbowBerries: sessionStats.rainbowEaten
    });

    // Check End-game Achievements
    if (score >= 1000) triggerUnlock('SNAKE_KING');
    if (mode === 'TIME_CHALLENGE' && score >= 500) triggerUnlock('TIME_LORD');
  }, [mode, score, highestCombo, sessionStats, triggerUnlock]);

  // Time Challenge 1-second interval
  useEffect(() => {
    if (gameState !== 'PLAYING' || mode !== 'TIME_CHALLENGE') return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, mode, handleGameOver]);

  // 1-second effect duration countdown
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const buffInterval = setInterval(() => {
      setActiveEffects((prev) => ({
        ...prev,
        SCORE_X3: Math.max(0, prev.SCORE_X3 - 1),
        SLOW_MO: Math.max(0, prev.SLOW_MO - 1),
        SPEED_BOOST: Math.max(0, prev.SPEED_BOOST - 1),
        MAGNET: Math.max(0, prev.MAGNET - 1),
        SPEED_FOOD: Math.max(0, prev.SPEED_FOOD - 1),
        SLOW_FOOD: Math.max(0, prev.SLOW_FOOD - 1),
        MULTIPLIER_FOOD: Math.max(0, prev.MULTIPLIER_FOOD - 1)
      }));

      // Power-up on board expiration
      setPowerUp((prev) => {
        if (!prev) return null;
        if (prev.lifetimeSeconds <= 1) return null;
        return { ...prev, lifetimeSeconds: prev.lifetimeSeconds - 1 };
      });
    }, 1000);

    return () => clearInterval(buffInterval);
  }, [gameState]);

  // Main Game Tick Loop
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const currentSpeed = calculateSpeed(level, activeEffects);

    const tick = () => {
      // Dequeue next direction
      let currentDir = direction;
      if (directionQueueRef.current.length > 0) {
        currentDir = directionQueueRef.current.shift();
        setDirection(currentDir);
      }

      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let newHead = { x: head.x + currentDir.x, y: head.y + currentDir.y };

        // 1. Wall Collision Check
        if (checkWallCollision(newHead)) {
          if (mode === 'ENDLESS') {
            newHead = wrapCoordinates(newHead);
          } else {
            // Check Shield
            if (activeEffects.SHIELD) {
              soundManager.playShieldHit();
              setActiveEffects((eff) => ({ ...eff, SHIELD: false }));
              triggerUnlock('SHIELD_HERO');
              setBurstEffect({ x: head.x, y: head.y, color: '#38bdf8', count: 20 });
              return prevSnake; // Absorbed hit
            }
            if (lives > 0) {
              soundManager.playShieldHit();
              setLives((l) => l - 1);
              setBurstEffect({ x: head.x, y: head.y, color: '#ef4444', count: 20 });
              return prevSnake;
            }
            handleGameOver();
            return prevSnake;
          }
        }

        // 2. Self Collision Check
        if (checkSelfCollision(newHead, prevSnake)) {
          if (activeEffects.SHIELD) {
            soundManager.playShieldHit();
            setActiveEffects((eff) => ({ ...eff, SHIELD: false }));
            triggerUnlock('SHIELD_HERO');
            setBurstEffect({ x: newHead.x, y: newHead.y, color: '#38bdf8', count: 20 });
            return prevSnake;
          }
          if (lives > 0) {
            soundManager.playShieldHit();
            setLives((l) => l - 1);
            setBurstEffect({ x: newHead.x, y: newHead.y, color: '#ef4444', count: 20 });
            return prevSnake;
          }
          handleGameOver();
          return prevSnake;
        }

        // 3. Obstacle Collision Check (Survival Mode)
        if (mode === 'SURVIVAL' && checkObstacleCollision(newHead, obstacles)) {
          if (activeEffects.SHIELD) {
            soundManager.playShieldHit();
            setActiveEffects((eff) => ({ ...eff, SHIELD: false }));
            triggerUnlock('SHIELD_HERO');
            setBurstEffect({ x: newHead.x, y: newHead.y, color: '#38bdf8', count: 20 });
            return prevSnake;
          }
          if (lives > 0) {
            soundManager.playShieldHit();
            setLives((l) => l - 1);
            setBurstEffect({ x: newHead.x, y: newHead.y, color: '#ef4444', count: 20 });
            return prevSnake;
          }
          handleGameOver();
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // 4. Food Collision Check
        if (food && isSamePosition(newHead, food)) {
          const foodConfig = FOOD_TYPES[food.type] || FOOD_TYPES.NORMAL;
          const pointsGained = calculateScoreGain(foodConfig.points, combo, activeEffects);
          const nextScore = score + pointsGained;

          setScore(nextScore);
          soundManager.playEat(food.type);

          // Particles
          setBurstEffect({
            x: food.x,
            y: food.y,
            color: foodConfig.color,
            count: food.type === 'RAINBOW' ? 28 : 16
          });

          // Session & Achievement Tracking
          setSessionStats((prev) => {
            const updated = {
              ...prev,
              foodsEaten: prev.foodsEaten + 1,
              goldenEaten: food.type === 'GOLDEN' ? prev.goldenEaten + 1 : prev.goldenEaten,
              rainbowEaten: food.type === 'RAINBOW' ? prev.rainbowEaten + 1 : prev.rainbowEaten
            };

            if (updated.foodsEaten === 1) triggerUnlock('FIRST_BITE');
            if (updated.goldenEaten >= 5) triggerUnlock('GOLDEN_HUNTER');
            if (updated.rainbowEaten >= 3) triggerUnlock('RAINBOW_FEAST');

            return updated;
          });

          // Time bonus for Time Challenge mode
          if (mode === 'TIME_CHALLENGE') {
            setRemainingTime((t) => t + (food.type === 'GOLDEN' ? 5 : food.type === 'RAINBOW' ? 8 : 3));
          }

          // Special food status effects
          if (food.type === 'SPEED') {
            setActiveEffects((eff) => ({ ...eff, SPEED_FOOD: 6 }));
          } else if (food.type === 'SLOW') {
            setActiveEffects((eff) => ({ ...eff, SLOW_FOOD: 6 }));
          } else if (food.type === 'MULTIPLIER') {
            setActiveEffects((eff) => ({ ...eff, MULTIPLIER_FOOD: 8 }));
          }

          // Combo progression
          const nextCombo = Math.min(10, combo + 1);
          setCombo(nextCombo);
          setHighestCombo((h) => Math.max(h, nextCombo));
          soundManager.playCombo(nextCombo);
          resetComboTimer();

          if (nextCombo >= 5) triggerUnlock('COMBO_5');
          if (nextCombo >= 10) triggerUnlock('COMBO_10');

          // Level calculation
          const nextLevel = calculateLevel(nextScore);
          if (nextLevel > level) {
            setLevel(nextLevel);
            soundManager.playLevelUp();
            setLevelUpNotice(true);
            setTimeout(() => setLevelUpNotice(false), 1400);

            if (nextLevel >= 5) triggerUnlock('SPEED_DEMON');

            // Survival mode spawns more obstacles on level-up
            if (mode === 'SURVIVAL') {
              setObstacles(generateObstacles(nextLevel, newSnake));
            }
          }

          // Spawn new food
          const nextFood = spawnFood([...newSnake, ...obstacles]);
          setFood(nextFood);

          // Random chance to spawn power-up if none active
          if (!powerUp && Math.random() < 0.28) {
            const nextPowerUp = spawnPowerUp([...newSnake, ...obstacles, nextFood]);
            setPowerUp(nextPowerUp);
          }

          return newSnake; // Snake grows (don't pop tail)
        }

        // 5. Power-up Collision Check
        if (powerUp && isSamePosition(newHead, powerUp)) {
          soundManager.playPowerUp();
          setBurstEffect({ x: powerUp.x, y: powerUp.y, color: '#fbbf24', count: 20 });

          if (powerUp.type === 'SHIELD') {
            setActiveEffects((eff) => ({ ...eff, SHIELD: true }));
          } else if (powerUp.type === 'EXTRA_LIFE') {
            setLives((l) => l + 1);
          } else {
            // Timed buff
            const duration = POWER_UPS[powerUp.type]?.duration || 10;
            setActiveEffects((eff) => ({ ...eff, [powerUp.type]: duration }));
          }

          setPowerUp(null);
        }

        // Magnet attraction effect (pulls food towards snake)
        if (activeEffects.MAGNET > 0 && food) {
          magnetTickRef.current++;
          if (magnetTickRef.current % 2 === 0) {
            const dist = getDistance(food, newHead);
            if (dist > 1 && dist <= 6) {
              const pulledPos = applyMagnetPull(food, newHead);
              const isBlocked = newSnake.some((s) => isSamePosition(s, pulledPos)) ||
                                obstacles.some((o) => isSamePosition(o, pulledPos));
              if (!isBlocked) {
                setFood((f) => ({ ...f, x: pulledPos.x, y: pulledPos.y }));
              }
            }
          }
        }

        // Pop tail if no food eaten
        newSnake.pop();
        return newSnake;
      });
    };

    const intervalId = setInterval(tick, currentSpeed);
    return () => clearInterval(intervalId);
  }, [
    gameState,
    level,
    activeEffects,
    direction,
    food,
    powerUp,
    obstacles,
    mode,
    score,
    combo,
    lives,
    handleGameOver,
    resetComboTimer,
    triggerUnlock
  ]);

  // Pause / Resume Toggle
  const togglePause = useCallback(() => {
    soundManager.playClick();
    if (gameState === 'PLAYING') {
      setGameState('PAUSED');
    } else if (gameState === 'PAUSED') {
      setGameState('PLAYING');
    }
  }, [gameState]);

  // Keyboard navigation & controls listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent browser default scrolling for gaming keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ' || e.code === 'Space') {
        if (gameState === 'PLAYING' || gameState === 'PAUSED') {
          togglePause();
        }
        return;
      }

      if (e.key === 'Enter') {
        if (gameState === 'MENU' || gameState === 'GAMEOVER') {
          startGame();
        }
        return;
      }

      if (gameState !== 'PLAYING') return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          changeDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          changeDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, togglePause, startGame, changeDirection]);

  return {
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
    startGame,
    togglePause,
    onCountdownComplete
  };
};
