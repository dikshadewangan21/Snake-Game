export const GRID_SIZE = 20;

export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 }
];

export const INITIAL_DIRECTION = { x: 0, y: -1 }; // Moving UP

export const DIRECTIONS = {
  UP: { x: 0, y: -1, name: 'UP' },
  DOWN: { x: 0, y: 1, name: 'DOWN' },
  LEFT: { x: -1, y: 0, name: 'LEFT' },
  RIGHT: { x: 1, y: 0, name: 'RIGHT' }
};

export const OPPOSITES = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT'
};

export const GAME_MODES = {
  CLASSIC: {
    id: 'CLASSIC',
    name: 'Classic',
    tagline: 'Standard arcade rules. Walls are deadly.',
    icon: '🎮',
    hasWalls: true,
    hasTimer: false,
    hasObstacles: false
  },
  ENDLESS: {
    id: 'ENDLESS',
    name: 'Endless',
    tagline: 'Wrap around borders safely. Focus on giant growth.',
    icon: '♾️',
    hasWalls: false,
    hasTimer: false,
    hasObstacles: false
  },
  TIME_CHALLENGE: {
    id: 'TIME_CHALLENGE',
    name: 'Time Challenge',
    tagline: 'Beat the clock! Collect food to earn bonus seconds.',
    icon: '⏳',
    hasWalls: true,
    hasTimer: true,
    initialSeconds: 75,
    hasObstacles: false
  },
  SURVIVAL: {
    id: 'SURVIVAL',
    name: 'Survival',
    tagline: 'Beware of dynamic obstacle blocks multiplying over time.',
    icon: '⚡',
    hasWalls: true,
    hasTimer: false,
    hasObstacles: true
  }
};

export const FOOD_TYPES = {
  NORMAL: {
    id: 'NORMAL',
    name: 'Ruby Apple',
    points: 10,
    color: '#ff3366',
    glow: 'rgba(255, 51, 102, 0.7)',
    icon: '🍎',
    weight: 55,
    effect: 'Standard delicious nutrition.'
  },
  GOLDEN: {
    id: 'GOLDEN',
    name: 'Golden Apple',
    points: 25,
    color: '#ffd700',
    glow: 'rgba(255, 215, 0, 0.85)',
    icon: '⭐',
    weight: 15,
    effect: '+25 bonus points & rapid combo boost.'
  },
  RAINBOW: {
    id: 'RAINBOW',
    name: 'Rainbow Berry',
    points: 50,
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.9)',
    icon: '💎',
    weight: 8,
    effect: 'Huge +50 points and sparkling visual aura.'
  },
  SPEED: {
    id: 'SPEED',
    name: 'Speed Pepper',
    points: 15,
    color: '#f97316',
    glow: 'rgba(249, 115, 22, 0.8)',
    icon: '🌶️',
    weight: 7,
    effect: 'Temporarily revs up speed for fast scoring.'
  },
  SLOW: {
    id: 'SLOW',
    name: 'Frost Snail',
    points: 15,
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.8)',
    icon: '🧊',
    weight: 8,
    effect: 'Cools down game speed for precise steering.'
  },
  MULTIPLIER: {
    id: 'MULTIPLIER',
    name: 'Star Multiplier',
    points: 20,
    color: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.85)',
    icon: '✨',
    weight: 7,
    effect: 'Doubles all score gains for 8 seconds.'
  }
};

export const POWER_UPS = {
  SHIELD: {
    id: 'SHIELD',
    name: 'Energy Shield',
    icon: '🛡️',
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.85)',
    duration: 12,
    effect: 'Absorbs 1 deadly wall or body collision.'
  },
  SCORE_X3: {
    id: 'SCORE_X3',
    name: '3X Score Surge',
    icon: '🌟',
    color: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.85)',
    duration: 10,
    effect: 'Triples all points collected.'
  },
  SLOW_MO: {
    id: 'SLOW_MO',
    name: 'Chrono Slow',
    icon: '⏱️',
    color: '#2dd4bf',
    glow: 'rgba(45, 212, 191, 0.85)',
    duration: 8,
    effect: 'Slows down game tempo for safe navigation.'
  },
  SPEED_BOOST: {
    id: 'SPEED_BOOST',
    name: 'Hyper Velocity',
    icon: '🚀',
    color: '#f43f5e',
    glow: 'rgba(244, 63, 94, 0.85)',
    duration: 8,
    effect: 'High speed overdrive with bonus combo points.'
  },
  MAGNET: {
    id: 'MAGNET',
    name: 'Gravity Magnet',
    icon: '🧲',
    color: '#818cf8',
    glow: 'rgba(129, 140, 248, 0.85)',
    duration: 10,
    effect: 'Draws nearby food items toward your head.'
  },
  EXTRA_LIFE: {
    id: 'EXTRA_LIFE',
    name: 'Phoenix Heart',
    icon: '❤️',
    color: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.85)',
    duration: null, // Instant stack
    effect: '+1 Life fallback when you hit a hazard.'
  }
};

export const ACHIEVEMENTS = [
  {
    id: 'FIRST_BITE',
    title: 'First Bite',
    desc: 'Devour your very first delicious food item.',
    icon: '🏆',
    rarity: 'Common'
  },
  {
    id: 'COMBO_5',
    title: 'Combo Striker',
    desc: 'Reach a continuous 5x combo streak.',
    icon: '⚡',
    rarity: 'Uncommon'
  },
  {
    id: 'COMBO_10',
    title: 'Combo Master',
    desc: 'Reach a phenomenal 10x combo streak!',
    icon: '🔥',
    rarity: 'Rare'
  },
  {
    id: 'SPEED_DEMON',
    title: 'Speed Demon',
    desc: 'Reach Level 5 and conquer top game speeds.',
    icon: '🚀',
    rarity: 'Rare'
  },
  {
    id: 'GOLDEN_HUNTER',
    title: 'Golden Hunter',
    desc: 'Collect 5 glittering Golden Apples across games.',
    icon: '💎',
    rarity: 'Rare'
  },
  {
    id: 'RAINBOW_FEAST',
    title: 'Rainbow Feast',
    desc: 'Collect 3 rare Rainbow Berries.',
    icon: '🌈',
    rarity: 'Epic'
  },
  {
    id: 'SHIELD_HERO',
    title: 'Guardian Angel',
    desc: 'Survive a lethal hit thanks to an active Shield.',
    icon: '🛡️',
    rarity: 'Epic'
  },
  {
    id: 'TIME_LORD',
    title: 'Chrono Master',
    desc: 'Survive and score 500+ points in Time Challenge.',
    icon: '⏳',
    rarity: 'Legendary'
  },
  {
    id: 'SNAKE_KING',
    title: 'Snake King',
    desc: 'Score over 1,000 points in a single legendary run.',
    icon: '👑',
    rarity: 'Legendary'
  }
];

export const MISSIONS_LIST = [
  {
    id: 'eat_15',
    title: 'Healthy Eater',
    desc: 'Collect 15 food items in a single session.',
    target: 15,
    key: 'foodsEaten'
  },
  {
    id: 'golden_2',
    title: 'Starlight Seeker',
    desc: 'Collect 2 Golden Apples.',
    target: 2,
    key: 'goldenEaten'
  },
  {
    id: 'score_400',
    title: 'High Roller',
    desc: 'Accumulate 400 score points.',
    target: 400,
    key: 'score'
  },
  {
    id: 'reach_lvl3',
    title: 'Ascension',
    desc: 'Advance to Level 3.',
    target: 3,
    key: 'level'
  },
  {
    id: 'combo_4',
    title: 'Rhythm Keeper',
    desc: 'Pull off a 4x combo.',
    target: 4,
    key: 'combo'
  }
];

export const BASE_SPEED = 140; // ms per tick
export const MIN_SPEED = 60;   // maximum speed (ms per tick)
export const SPEED_DECREMENT_PER_LEVEL = 12;
export const POINTS_PER_LEVEL = 120;
export const COMBO_TIMEOUT = 3800; // 3.8 seconds to chain another food
