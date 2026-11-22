// Shared 4-bar chord & melody sequence (Cmaj7 -> Am7 -> Fmaj7 -> G6) at 96 BPM
const SONG_STEP_SEC = 0.3125; // eighth-note @ 96 BPM (16 steps = 5s)
const CHORD_ROOTS = [130.81, 110.0, 87.31, 98.0]; // C3, A2, F2, G2
const MELODY_BARS: number[][] = [
  [523.25, 659.25, 783.99, 659.25], // C5 E5 G5 E5
  [440.0, 523.25, 659.25, 523.25],  // A4 C5 E5 C5
  [349.23, 440.0, 523.25, 659.25],  // F4 A4 C5 E5
  [392.0, 493.88, 587.33, 659.25],  // G4 B4 D5 E5
];

function scheduleSongBar(
  ctx: BaseAudioContext,
  dest: AudioNode,
  startTime: number,
  barIdx: number,
  masterLevel: number
) {
  const b = barIdx % CHORD_ROOTS.length;
  const root = CHORD_ROOTS[b];
  const notes = MELODY_BARS[b];

  // Warm soft bass pulse
  const bassOsc = ctx.createOscillator();
  const bassGain = ctx.createGain();
  bassOsc.type = 'sine';
  bassOsc.frequency.setValueAtTime(root, startTime);
  bassGain.gain.setValueAtTime(0.0001, startTime);
  bassGain.gain.linearRampToValueAtTime(masterLevel * 0.85, startTime + 0.04);
  bassGain.gain.exponentialRampToValueAtTime(0.0005, startTime + SONG_STEP_SEC * 3.8);
  bassOsc.connect(bassGain);
  bassGain.connect(dest);
  bassOsc.start(startTime);
  bassOsc.stop(startTime + SONG_STEP_SEC * 4);

  // Pluck marimba-style arpeggio
  notes.forEach((freq, i) => {
    const t = startTime + i * SONG_STEP_SEC;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(masterLevel * 0.55, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0005, t + SONG_STEP_SEC * 0.9);
    osc.connect(gain);
    gain.connect(dest);
    osc.start(t);
    osc.stop(t + SONG_STEP_SEC);
  });
}

export class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private songEnabled: boolean = true;
  private songTimer: number | null = null;
  private songBarIndex: number = 0;
  private songGain: GainNode | null = null;
  private leakGain: GainNode | null = null;

  constructor() {}

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  public setMuted(mute: boolean) {
    this.muted = mute;
    if (mute && this.leakGain) {
      this.leakGain.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setSongEnabled(enabled: boolean) {
    this.songEnabled = enabled;
    if (enabled) {
      this.startSong();
    } else {
      this.stopSong();
    }
  }

  public isSongEnabled(): boolean {
    return this.songEnabled;
  }

  public startSong() {
    if (!this.songEnabled || this.songTimer !== null || typeof window === 'undefined') return;
    this.initCtx();
    if (!this.ctx) return;

    if (!this.songGain) {
      this.songGain = this.ctx.createGain();
      this.songGain.connect(this.ctx.destination);
    }
    this.songGain.gain.setValueAtTime(1, this.ctx.currentTime);

    const barMs = SONG_STEP_SEC * 4 * 1000;
    const playNextBar = () => {
      if (!this.ctx || !this.songGain || !this.songEnabled) return;
      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }
      scheduleSongBar(this.ctx, this.songGain, this.ctx.currentTime + 0.03, this.songBarIndex++, 0.06);
    };

    playNextBar();
    this.songTimer = window.setInterval(playNextBar, barMs);
  }

  public stopSong() {
    if (this.songTimer !== null && typeof window !== 'undefined') {
      window.clearInterval(this.songTimer);
      this.songTimer = null;
    }
    if (this.songGain && this.ctx) {
      this.songGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  public playClick() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.04);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  public playClamp() {
    
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(120, t);
    osc1.frequency.exponentialRampToValueAtTime(60, t + 0.18);
    gain1.gain.setValueAtTime(0.25, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.18);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, t + 0.02);
    osc2.frequency.setValueAtTime(1320, t + 0.07);
    gain2.gain.setValueAtTime(0.18, t + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(t + 0.02);
    osc2.stop(t + 0.25);
  }

  public playTape() {
    
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.linearRampToValueAtTime(850, t + 0.08);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  }

  public playFall() {
    
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.2);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.2);
  }

  public playCrack() {
    
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.setValueAtTime(320, t + 0.03);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.28);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.28);
  }

  public playRejectGood() {
    
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(680, t + 0.12);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  public playRejectBad() {
    
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.setValueAtTime(210, t + 0.08);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.2);
  }

  public playCoin() {
    
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1760, t);
    osc.frequency.setValueAtTime(2200, t + 0.05);
    gain.gain.setValueAtTime(0.16, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.35);
  }

  public playWin() {
    
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const freqs = [523.25, 659.25, 783.99, 1046.5]; 
    const t = this.ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const startTime = t + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }
}

export const soundEngine = new SoundEngine();

/** Encode a mono Float32 AudioBuffer into a 16-bit PCM WAV Blob. */
export function encodeWav(buffer: AudioBuffer): Blob {
  const samples = buffer.getChannelData(0);
  const dataBytes = samples.length * 2;
  const wav = new ArrayBuffer(44 + dataBytes);
  const view = new DataView(wav);
  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + dataBytes, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, buffer.sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, dataBytes, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }
  return new Blob([wav], { type: 'audio/wav' });
}

/** Render the game background theme into a downloadable WAV Blob. */
export async function renderSongWav(loops = 2): Promise<Blob> {
  const sampleRate = 44100;
  const barSec = SONG_STEP_SEC * 4;
  const totalBars = CHORD_ROOTS.length * loops;
  const durationSec = totalBars * barSec;
  const offline = new OfflineAudioContext(1, Math.ceil(sampleRate * durationSec), sampleRate);

  for (let bar = 0; bar < totalBars; bar++) {
    scheduleSongBar(offline, offline.destination, bar * barSec, bar, 0.28);
  }
  const rendered = await offline.startRendering();
  return encodeWav(rendered);
}

/** Render and trigger download of the background song WAV file. */
export async function exportSongWav(filename = 'fare-sales-funnel-song.wav'): Promise<void> {
  const blob = await renderSongWav(2);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
