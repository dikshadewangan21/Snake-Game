# 🐍 SnakeVerse — Modern React Snake Game

A vibrant, arcade-grade Snake game built with **React.js**, featuring rich visual effects, procedural 8-bit Web Audio synthesis, multiple game modes, distinct food varieties, power-ups, combo chains, level progression, achievements, missions, and cross-platform responsive controls.

---

## 🎮 About the Game

**SnakeVerse** is a modern reimagining of the timeless arcade classic. Crafted with React hooks and modern CSS, SnakeVerse delivers an authentic, high-tempo arcade experience with vibrant neon glow aesthetics, tactile input responsiveness, and rewarding gameplay depth. Whether you are aiming for high-score records in Classic mode, freely wrapping edges in Endless mode, racing the countdown in Time Challenge, or dodging dynamic hazard blocks in Survival mode, SnakeVerse keeps the classic gameplay addictive and fresh.

---

## ✨ Features

- 🕹️ **4 Unique Game Modes**: Classic, Endless, Time Challenge, and Survival.
- 🍎 **6 Dynamic Food Types**: Ruby Apple, Golden Apple, Rainbow Berry, Speed Pepper, Frost Snail, and Star Multiplier.
- ⚡ **6 Tactical Power-Ups**: Energy Shield, 3X Score Surge, Chrono Slow-Mo, Hyper Velocity, Gravity Magnet, and Phoenix Extra Life.
- 🔥 **Escalating Combo System**: Chain food collections within a time window for up to 10× score multipliers and sound pitch rises.
- 📈 **Dynamic Level Progression**: Seamless speed scaling every 120 points accompanied by animated level-up announcements.
- 🚧 **Hazard Obstacles**: Dynamic blocks multiplying in Survival mode to test reflexes.
- 🏆 **Achievement System**: 9 unlockable trophies with animated toasts celebrating milestones.
- 🎯 **Session Missions Tracker**: Real-time challenge quest system.
- 🔊 **Zero-Dependency Procedural Web Audio**: 100% reliable 8-bit sound effects and synthesized retro chiptune background music generated on-the-fly via the browser's Web Audio API.
- 🎨 **Dual Visual Themes**: Choose between **Neon Arcade** (cyberpunk glow) and **Candy** (sweet vibrant pastel).
- 💾 **Persistent Storage**: High scores per mode, best combos, unlocked achievements, and sound/theme preferences saved in `localStorage`.
- 📱 **Mobile & Touch Ready**: Full touch swipe gestures, responsive virtual on-screen D-Pad, and viewport scroll-lock.
- ♿ **Accessible & Fluid**: Keyboard accessible, clear focus rings, and high-contrast colorways.

---

## 🕹️ Game Modes

| Mode | Rules & Behavior |
| :--- | :--- |
| **Classic** | Traditional arcade rules. Hitting the outer boundary or snake body results in Game Over. |
| **Endless** | Border walls wrap around smoothly to the opposite edge. Great for long growth runs. |
| **Time Challenge** | 75-second countdown timer. Eating food adds valuable bonus seconds. Score as much as possible before time runs out! |
| **Survival** | Hazard blocks spawn onto the board as levels increase. Navigate tightly around obstacle matrices. |

---

## 🎯 Controls

### Desktop Controls
- <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> or <kbd>▲</kbd> <kbd>◀</kbd> <kbd>▼</kbd> <kbd>▶</kbd>: Steer snake direction.
- <kbd>SPACE</kbd>: Pause / Resume gameplay.
- <kbd>ENTER</kbd>: Start game from menu / Quick Restart after Game Over.

### Mobile & Tablet Controls
- **Swipe Gestures**: Swipe anywhere on the game board in the desired direction.
- **Virtual D-Pad**: Tap the on-screen Up, Down, Left, and Right buttons for precise tactile navigation.

> *Note: Default browser scrolling on arrow keys and spacebar is automatically intercepted to ensure seamless controls.*

---

## 🍎 Food & Power-ups

### Food Types

| Food | Icon | Points | Special Effect |
| :--- | :---: | :---: | :--- |
| **Ruby Apple** | 🍎 | +10 | Standard delicious sustenance. |
| **Golden Apple** | ⭐ | +25 | High value snack granting instant combo acceleration. |
| **Rainbow Berry** | 💎 | +50 | Rare delicacy with shimmering aura and huge score payout. |
| **Speed Pepper** | 🌶️ | +15 | Revs up snake speed for quick scoring streaks. |
| **Frost Snail** | 🧊 | +15 | Cools down tempo for tight, precise maneuvering. |
| **Star Multiplier** | ✨ | +20 | Activates a 2× point multiplier for 8 seconds. |

### Power-Ups

| Power-Up | Icon | Duration | Tactical Effect |
| :--- | :---: | :---: | :--- |
| **Energy Shield** | 🛡️ | Until Hit | Absorbs 1 deadly wall, obstacle, or self collision without dying. |
| **3X Score Surge** | 🌟 | 10s | Triples all score gains while active. |
| **Chrono Slow** | ⏱️ | 8s | Slows down game ticks by 45% for safe clearance. |
| **Hyper Velocity** | 🚀 | 8s | Turbo speed overdrive accompanied by 1.5× score multiplier. |
| **Gravity Magnet** | 🧲 | 10s | Pulls nearby food items toward your head within a 6-cell radius. |
| **Phoenix Heart** | ❤️ | Permanent | Grants +1 Extra Life fallback when hitting a hazard. |

---

## 🏆 Scoring & Combo System

- **Base Formula**:
  $$\text{Score Gained} = \text{Base Food Points} \times \text{Combo Multiplier} \times \text{Active Buff Multipliers}$$
- **Combo Chains**: Eating another food item before the combo gauge drains (3.8 seconds) increments the combo multiplier ($1\times \to 2\times \to 3\times \dots 10\times$).
- **Level Scaling**: Every 120 points advances your level, ramping up game speed and hazard density in Survival mode.

---

## 🏅 Achievements

1. 🏆 **First Bite** — Devour your very first delicious food item.
2. ⚡ **Combo Striker** — Reach a continuous 5x combo streak.
3. 🔥 **Combo Master** — Reach a phenomenal 10x combo streak!
4. 🚀 **Speed Demon** — Advance to Level 5.
5. 💎 **Golden Hunter** — Collect 5 glittering Golden Apples.
6. 🌈 **Rainbow Feast** — Collect 3 rare Rainbow Berries.
7. 🛡️ **Guardian Angel** — Absorb a lethal impact thanks to an active Shield.
8. ⏳ **Chrono Master** — Score 500+ points in Time Challenge mode.
9. 👑 **Snake King** — Score over 1,000 points in a single legendary run.

---

## 🎨 Themes

SnakeVerse includes two themes switchable in **Settings**:
- **Neon Arcade** *(Default)*: Deep cyber dark backdrop with electric cyan, hot magenta, and radioactive lime glows.
- **Candy / Colorful**: Sweet vibrant pastel gradients, soft rounded aesthetic, and warm playful hues.

Theme selections are persisted across page reloads in `localStorage`.

---

## 🛠️ Tech Stack

- **React 18** — Functional components, custom hooks, reactive state machine.
- **Vite** — Next-generation build tool with instant HMR and optimized bundles.
- **JavaScript (ES6+)** — Clean, modular code.
- **HTML5 & CSS3** — Responsive layouts, CSS variables, CSS keyframe animations, glassmorphism (`backdrop-filter`).
- **Web Audio API** — Procedural synthesizer for retro SFX and chiptune BGM without external asset downloads.
- **Canvas-Confetti** — Celebration fireworks for high-score achievements.
- **Lucide React** — Minimalist arcade interface iconography.

---

## 📁 Project Structure

```
Snake-Game-main/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── src/
│   ├── main.jsx                 # Application entry point
│   ├── App.jsx                  # Root layout & view controller
│   ├── index.css                # Global theme variables & typography
│   ├── components/
│   │   ├── GameBoard.jsx        # Grid renderer (snake, foods, powerups, obstacles)
│   │   ├── Snake.jsx            # Head, eyes, tongue, dynamic body segments
│   │   ├── Food.jsx             # 6 food type visual renderers & glows
│   │   ├── PowerUp.jsx          # Timed power-up floating badges
│   │   ├── GameHUD.jsx          # Real-time score, high score, combo meter, buffs
│   │   ├── Controls.jsx         # Virtual touch D-Pad and keyboard hints
│   │   ├── MainMenu.jsx         # Hero title, game mode cards, quick navigation
│   │   ├── GameOver.jsx         # Results summary, record fanfare, replay actions
│   │   ├── PauseMenu.jsx        # Glassmorphic pause overlay
│   │   ├── Settings.jsx         # Themes, SFX & BGM toggles, data reset
│   │   ├── Countdown.jsx        # 3-2-1-GO! animated overlay
│   │   ├── AchievementsModal.jsx# Showcase for all 9 achievement trophies
│   │   ├── MissionsModal.jsx    # Session quest challenge tracker
│   │   ├── HowToPlayModal.jsx   # Rules and power-up glossary
│   │   └── ParticleCanvas.jsx   # Particle bursts for snacks, level-ups & shields
│   ├── hooks/
│   │   ├── useSnakeGame.js      # Core game loop, collision engine, input queuing
│   │   └── useSwipe.js          # Touch swipe gesture detection
│   ├── utils/
│   │   ├── constants.js         # Game constants, foods, powerups, achievements
│   │   ├── gameLogic.js         # Speed curves, level math, magnet pull, obstacles
│   │   ├── collision.js         # Wall, body, and obstacle collision detection
│   │   ├── food.js              # Safe spawning algorithms (never overlaps snake)
│   │   ├── storage.js           # LocalStorage helpers for persistent records
│   │   └── audio.js             # Web Audio API procedural sound engine
│   └── styles/
│       ├── App.css
│       ├── GameBoard.css
│       ├── HUD.css
│       ├── MainMenu.css
│       ├── Modals.css
│       └── Controls.css
```

---

## 🚀 Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) (v18+) installed.

```bash
# Clone the repository
git clone https://github.com/your-username/Snake-Game.git

# Navigate into the project directory
cd Snake-Game

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the URL displayed in your terminal) to play!

---

## 💻 Development

Run the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

---

## 🏗️ Build

Create a minified, production-ready build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 📱 Responsive Design

- **Desktop & Laptop**: Full keyboard navigation (<kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> / Arrow keys, <kbd>SPACE</kbd>, <kbd>ENTER</kbd>) with crisp retro aesthetics.
- **Mobile & Tablet**:
  - Auto-scaling game board fitting within `min(88vw, 440px)`.
  - Intuitive touch swipe gestures directly on the board.
  - Responsive tactile Virtual D-Pad.
  - Viewport scroll lock prevents unwanted page bounce or pulling while playing.

---

## 💾 Data Storage

SnakeVerse uses browser `localStorage` under isolated keys:
- `snakeverse_high_scores`: Records for each of the 4 game modes.
- `snakeverse_best_combo`: Highest all-time combo achieved.
- `snakeverse_settings`: Theme choice (`neon` / `candy`), SFX enabled, Music enabled.
- `snakeverse_achievements`: Array of unlocked achievement IDs.
- `snakeverse_stats`: Lifetime games played, total points, golden apples collected.

A **Reset Progress** option is readily available inside the Settings menu if you want a fresh start.

---

## 🔊 Audio System

SnakeVerse features a zero-dependency **Web Audio API sound engine**:
- **Zero Broken Links**: All sounds are mathematically synthesized square, sine, and triangle waves.
- **Sound Effects**: Tailored frequencies for eating normal food, golden snacks, rainbow berries, speed rush, slow freeze, multiplier star, shield impact, level up fanfare, and game over.
- **Background Music**: Optional 8-bit rhythmic arpeggiator loop that can be enabled in Settings or HUD.
- **User Preference**: Sound and Music state is saved and restored automatically.

---

## 🧪 Testing & Verification

1. **Controls Testing**: Verified WASD, Arrow keys, Space (pause/resume), Enter (start/restart), mobile touch swipes, and virtual D-Pad buttons.
2. **Game Modes Testing**:
   - Classic: Confirmed wall collisions trigger Game Over or consume Shield/Life.
   - Endless: Confirmed smooth border wraparound.
   - Time Challenge: Confirmed countdown timer and food time extensions.
   - Survival: Confirmed dynamic hazard blocks spawn and block movement.
3. **Collision Precision**: Verified food and obstacles never spawn on top of the snake body.
4. **Power-Ups & Buffs**: Verified Shield absorption, Magnet drawing food towards snake, Slow Motion, Hyper Velocity, and 3X multiplier.
5. **Combos & Levels**: Tested combo timer progression and level-up overlay animation.
6. **Data Persistence**: Verified localStorage saves high scores, achievements, and settings across browser refreshes.
7. **Production Build**: Verified clean `npm run build` with zero compiler errors or warnings.

---

## 🚀 Future Improvements

- 🌐 Online global leaderboard via Supabase / Firebase.
- 👥 Real-time 2-player split-screen or WebSocket multiplayer.
- 🎨 Unlockable custom snake skins and trails (matrix code trail, dragon scales, retro pixel).
- 🗺️ Custom maze maps and editor.
- 📅 Daily challenges with special board modifiers.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
