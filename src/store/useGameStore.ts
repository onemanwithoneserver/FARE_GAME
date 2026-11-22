import { create } from "zustand";

interface GameState {
  score: number;
  muted: boolean;
  addScore: (n: number) => void;
  toggleMute: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  muted: false,
  addScore: (n) => set((s) => ({ score: s.score + n })),
  toggleMute: () => set((s) => ({ muted: !s.muted })),
}));
