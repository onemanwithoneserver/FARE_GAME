import { Howl, Howler } from "howler";

// Place audio files in /public/sounds and register them here.
const sounds: Record<string, Howl> = {};

export function loadSound(name: string, src: string) {
  sounds[name] = new Howl({ src: [src] });
}

export function playSound(name: string) {
  sounds[name]?.play();
}

export function setMuted(muted: boolean) {
  Howler.mute(muted);
}
