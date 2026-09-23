class SoundEngine {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.musicEnabled = false;
    this.volume = 0.6;
    this.bgmInterval = null;
    this.bgmStep = 0;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setSfxEnabled(enabled) {
    this.sfxEnabled = enabled;
  }

  setMusicEnabled(enabled) {
    this.musicEnabled = enabled;
    if (enabled) {
      this.startBgm();
    } else {
      this.stopBgm();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  playTone(freq, type = 'sine', duration = 0.12, gainValue = 0.2, pitchDecay = 0) {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      if (pitchDecay !== 0) {
        osc.frequency.exponentialRampToValueAtTime(
          Math.max(20, freq + pitchDecay),
          this.ctx.currentTime + duration
        );
      }

      gain.gain.setValueAtTime(gainValue * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context might still be blocked by browser policy until user interacts
    }
  }

  playEat(foodType) {
    this.init();
    if (foodType === 'GOLDEN') {
      this.playTone(650, 'triangle', 0.15, 0.25, 300);
      setTimeout(() => this.playTone(920, 'triangle', 0.18, 0.25, 400), 60);
    } else if (foodType === 'RAINBOW') {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sine', 0.16, 0.2), idx * 45);
      });
    } else if (foodType === 'SPEED') {
      this.playTone(400, 'sawtooth', 0.12, 0.15, 500);
    } else if (foodType === 'SLOW') {
      this.playTone(600, 'sine', 0.2, 0.2, -250);
    } else if (foodType === 'MULTIPLIER') {
      this.playTone(700, 'square', 0.1, 0.15, 200);
      setTimeout(() => this.playTone(1050, 'triangle', 0.15, 0.2), 70);
    } else {
      // Normal
      this.playTone(480, 'sine', 0.09, 0.22, 180);
    }
  }

  playPowerUp() {
    const notes = [350, 520, 690, 950];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.15, 0.22, 120), idx * 60);
    });
  }

  playCombo(comboMultiplier) {
    const baseFreq = 440;
    const step = Math.min(comboMultiplier, 10) * 55;
    this.playTone(baseFreq + step, 'triangle', 0.14, 0.24, 80);
  }

  playLevelUp() {
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chords.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'square', 0.2, 0.18), idx * 80);
    });
  }

  playShieldHit() {
    this.playTone(220, 'sawtooth', 0.3, 0.35, -120);
    setTimeout(() => this.playTone(180, 'triangle', 0.2, 0.25), 80);
  }

  playGameOver() {
    const notes = [440, 370, 311, 220, 146];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'sawtooth', 0.25, 0.25, -50), idx * 100);
    });
  }

  playClick() {
    this.playTone(600, 'sine', 0.05, 0.15, -150);
  }

  playCountdown(isGo = false) {
    if (isGo) {
      this.playTone(880, 'triangle', 0.3, 0.3, 200);
    } else {
      this.playTone(440, 'sine', 0.15, 0.2);
    }
  }

  startBgm() {
    if (!this.musicEnabled || this.bgmInterval) return;
    this.init();

    // 8-bit retro synth rhythm
    const scale = [130.81, 146.83, 164.81, 196.00, 220.00, 196.00, 164.81, 146.83];
    this.bgmStep = 0;

    this.bgmInterval = setInterval(() => {
      if (!this.musicEnabled) {
        this.stopBgm();
        return;
      }
      try {
        const note = scale[this.bgmStep % scale.length];
        this.playTone(note, 'sine', 0.18, 0.06);
        this.bgmStep++;
      } catch {
        // Safe fail
      }
    }, 280);
  }

  stopBgm() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const soundManager = new SoundEngine();
