/**
 * Flower Studio - Romantic Ambient Web Audio Synth & Music Box
 * Generates delicate music-box arpeggios, romantic piano chords, and bloom chimes
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.effectsEnabled = true;
    this.bgmEnabled = true;
    this.bgmTimer = null;
    this.bgmNoteIndex = 0;
    this.bgmChordIndex = 0;

    // Pentatonic scale for instant bloom chimes
    this.scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

    // Romantic Lo-Fi Music Box Chords (Frequencies in Hz)
    // Cmaj9 -> Am9 -> Fmaj7#11 -> G9 -> Em7 -> A7b9 -> Dm9 -> G13
    this.romanticChords = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
      [174.61, 261.63, 329.63, 369.99, 440.00], // Fmaj7#11
      [196.00, 293.66, 392.00, 440.00, 587.33], // G9
      [164.81, 246.94, 329.63, 392.00, 493.88], // Em7
      [220.00, 277.18, 329.63, 392.00, 466.16], // A7b9
      [146.83, 220.00, 261.63, 329.63, 440.00], // Dm9
      [196.00, 246.94, 329.63, 392.00, 440.00]  // G13
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleEffects() {
    this.effectsEnabled = !this.effectsEnabled;
    return this.effectsEnabled;
  }

  toggleBGM() {
    this.init();
    this.bgmEnabled = !this.bgmEnabled;
    if (this.bgmEnabled) {
      this.startRomanticMusicBox();
    } else {
      this.stopRomanticMusicBox();
    }
    return this.bgmEnabled;
  }

  startRomanticMusicBox() {
    if (this.bgmTimer) return;
    this.init();
    
    // Play gentle music box notes in arpeggios
    const tick = () => {
      if (!this.bgmEnabled) return;
      const currentChord = this.romanticChords[this.bgmChordIndex];
      const freq = currentChord[this.bgmNoteIndex % currentChord.length];

      // Soft bell-like music box tone
      this.playMusicBoxNote(freq, 0.7, 0.08);

      this.bgmNoteIndex++;
      if (this.bgmNoteIndex >= 4) {
        this.bgmNoteIndex = 0;
        this.bgmChordIndex = (this.bgmChordIndex + 1) % this.romanticChords.length;
      }

      this.bgmTimer = setTimeout(tick, 480 + (Math.random() * 40));
    };

    tick();
  }

  stopRomanticMusicBox() {
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  playMusicBoxNote(frequency, duration = 0.8, maxVolume = 0.09) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // Sine wave combined with soft triangle for music-box sparkle
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, now);

    // Warm envelope
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(maxVolume, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  playBloomChord(pitchOffset = 0) {
    if (!this.effectsEnabled) return;
    this.init();
    if (!this.ctx) return;

    const baseIdx = Math.floor(Math.random() * (this.scale.length - 3));
    const notes = [
      this.scale[baseIdx],
      this.scale[baseIdx + 1],
      this.scale[baseIdx + 2]
    ];

    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.45, 0.12);
      }, i * 65);
    });
  }

  playSparkle() {
    if (!this.effectsEnabled) return;
    this.init();
    if (!this.ctx) return;

    const freq = this.scale[Math.floor(Math.random() * this.scale.length)] * 1.5;
    this.playTone(freq, 0.3, 0.07);
  }

  playTone(frequency, duration, maxVolume = 0.15) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.98, now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(maxVolume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }
}

window.soundEngine = new SoundEngine();
