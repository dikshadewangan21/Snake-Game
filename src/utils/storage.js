const STORAGE_KEYS = {
  HIGH_SCORES: 'snakeverse_high_scores',
  BEST_COMBO: 'snakeverse_best_combo',
  SETTINGS: 'snakeverse_settings',
  ACHIEVEMENTS: 'snakeverse_achievements',
  STATS: 'snakeverse_stats',
  MISSIONS: 'snakeverse_missions'
};

const DEFAULT_SETTINGS = {
  theme: 'neon', // 'neon' | 'candy'
  sfxEnabled: true,
  musicEnabled: false,
  volume: 0.7,
  selectedMode: 'CLASSIC'
};

export const getStoredHighScores = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HIGH_SCORES);
    return raw ? JSON.parse(raw) : { CLASSIC: 0, ENDLESS: 0, TIME_CHALLENGE: 0, SURVIVAL: 0 };
  } catch {
    return { CLASSIC: 0, ENDLESS: 0, TIME_CHALLENGE: 0, SURVIVAL: 0 };
  }
};

export const saveHighScore = (mode, score) => {
  try {
    const current = getStoredHighScores();
    if ((current[mode] || 0) < score) {
      current[mode] = score;
      localStorage.setItem(STORAGE_KEYS.HIGH_SCORES, JSON.stringify(current));
      return { isNewHigh: true, newScore: score };
    }
    return { isNewHigh: false, newScore: current[mode] || 0 };
  } catch {
    return { isNewHigh: false, newScore: score };
  }
};

export const getStoredBestCombo = () => {
  try {
    return parseInt(localStorage.getItem(STORAGE_KEYS.BEST_COMBO) || '0', 10);
  } catch {
    return 0;
  }
};

export const saveBestCombo = (combo) => {
  try {
    const current = getStoredBestCombo();
    if (combo > current) {
      localStorage.setItem(STORAGE_KEYS.BEST_COMBO, combo.toString());
      return combo;
    }
    return current;
  } catch {
    return combo;
  }
};

export const getStoredSettings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveStoredSettings = (newSettings) => {
  try {
    const current = getStoredSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  } catch {
    return newSettings;
  }
};

export const getStoredAchievements = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const unlockAchievement = (id) => {
  try {
    const current = getStoredAchievements();
    if (!current.includes(id)) {
      current.push(id);
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(current));
      return true; // newly unlocked
    }
    return false;
  } catch {
    return false;
  }
};

export const getStoredStats = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    return raw ? JSON.parse(raw) : { totalGames: 0, totalScore: 0, goldenApples: 0, rainbowBerries: 0 };
  } catch {
    return { totalGames: 0, totalScore: 0, goldenApples: 0, rainbowBerries: 0 };
  }
};

export const updateStoredStats = (delta) => {
  try {
    const current = getStoredStats();
    const updated = {
      totalGames: (current.totalGames || 0) + (delta.games || 0),
      totalScore: (current.totalScore || 0) + (delta.score || 0),
      goldenApples: (current.goldenApples || 0) + (delta.goldenApples || 0),
      rainbowBerries: (current.rainbowBerries || 0) + (delta.rainbowBerries || 0)
    };
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updated));
    return updated;
  } catch {
    return delta;
  }
};
