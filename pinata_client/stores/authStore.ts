import { create } from "zustand";
import type { User } from "@/types/user"; // ✅ 확장된 User 타입

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  decreaseBall: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setUser: (user) => set({ user, isLoggedIn: true }),
  clearUser: () => set({ user: null, isLoggedIn: false }),
  decreaseBall: () => {
    const user = get().user;
    if (!user) return;

    const newBall = Math.max((user.ball ?? 0) - 1, 0);
    set({ user: { ...user, ball: newBall } });
  },
}));
