import { ThrowBallResponse } from "@/types/throwBallResponse";
import { create } from "zustand";

interface GameState {
  result: ThrowBallResponse | null;
  setResult: (r: ThrowBallResponse) => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  result: null,
  setResult: (r) => set({ result: r }),
  reset: () => set({ result: null }),
}));
