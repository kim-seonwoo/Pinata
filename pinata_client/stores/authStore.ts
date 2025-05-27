import { create } from "zustand";
import type { User } from "@/types/user";

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setUser: (user) => set({ user, isLoggedIn: true }),
  clearUser: () => set({ user: null, isLoggedIn: false }),
}));
