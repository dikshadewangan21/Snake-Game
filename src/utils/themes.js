// ─────────────────────────────────────────────────────────
//  THEMES — 8 visual environments for SnakeVerse
// ─────────────────────────────────────────────────────────
export const THEMES = [
  {
    id: 'fresh-garden',
    name: 'Fresh Garden',
    icon: '🍏',
    desc: 'Lush greens and earthy tones',
    dark: false
  },
  {
    id: 'space',
    name: 'Space',
    icon: '🌌',
    desc: 'Deep cosmos, neon nebulas',
    dark: true
  },
  {
    id: 'sunset',
    name: 'Sunset',
    icon: '🌅',
    desc: 'Warm oranges and golden skies',
    dark: false
  },
  {
    id: 'candy',
    name: 'Candy',
    icon: '🍬',
    desc: 'Sweet pastels and playful pinks',
    dark: false
  },
  {
    id: 'ocean',
    name: 'Ocean',
    icon: '🌊',
    desc: 'Cool blues and aquamarine depths',
    dark: true
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: '🌲',
    desc: 'Ancient wood and mossy earth',
    dark: true
  },
  {
    id: 'lava',
    name: 'Lava',
    icon: '🔥',
    desc: 'Volcanic reds and molten orange',
    dark: true
  },
  {
    id: 'ice',
    name: 'Ice',
    icon: '❄️',
    desc: 'Crisp whites and crystalline blue',
    dark: false
  }
];

// ─────────────────────────────────────────────────────────
//  SNAKE SKINS
// ─────────────────────────────────────────────────────────
export const SNAKE_SKINS = [
  {
    id: 'classic',
    name: 'Classic',
    icon: '🐍',
    head: '#1e6b30',
    bodyA: '#2d8b47',
    bodyB: '#4eca72',
    glow: 'rgba(78,202,114,0.6)',
    isRainbow: false
  },
  {
    id: 'emerald',
    name: 'Emerald',
    icon: '💚',
    head: '#047857',
    bodyA: '#059669',
    bodyB: '#6ee7b7',
    glow: 'rgba(110,231,183,0.6)',
    isRainbow: false
  },
  {
    id: 'fire',
    name: 'Fire',
    icon: '🔥',
    head: '#b91c1c',
    bodyA: '#ef4444',
    bodyB: '#f97316',
    glow: 'rgba(249,115,22,0.6)',
    isRainbow: false
  },
  {
    id: 'ice',
    name: 'Ice',
    icon: '❄️',
    head: '#1e40af',
    bodyA: '#3b82f6',
    bodyB: '#bfdbfe',
    glow: 'rgba(147,197,253,0.7)',
    isRainbow: false
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    icon: '🌌',
    head: '#6b21a8',
    bodyA: '#7c3aed',
    bodyB: '#c4b5fd',
    glow: 'rgba(196,181,253,0.6)',
    isRainbow: false
  },
  {
    id: 'candy',
    name: 'Candy',
    icon: '🍬',
    head: '#be185d',
    bodyA: '#ec4899',
    bodyB: '#f9a8d4',
    glow: 'rgba(249,168,212,0.65)',
    isRainbow: false
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    icon: '🌈',
    head: '#dc2626',
    bodyA: '#f97316',
    bodyB: '#facc15',
    glow: 'rgba(250,204,21,0.6)',
    isRainbow: true
  }
];

export const getSkinById = (id) =>
  SNAKE_SKINS.find((s) => s.id === id) || SNAKE_SKINS[0];

export const getThemeById = (id) =>
  THEMES.find((t) => t.id === id) || THEMES[0];
