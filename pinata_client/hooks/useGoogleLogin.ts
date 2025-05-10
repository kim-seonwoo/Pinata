import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "expo-router";
import { signInWithGoogle, signOutFromGoogle } from "@/services/authService";

export function useGoogleAuth() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const router = useRouter();

  const login = async () => {
    try {
      const user = await signInWithGoogle();
      setUser(user);
    } catch (e) {
      console.error("❌ 로그인 실패:", e);
    }
  };

  const logout = async () => {
    try {
      await signOutFromGoogle();
      clearUser();
    } catch (e) {
      console.error("❌ 로그아웃 실패:", e);
    }
  };

  return { login, logout };
}
