import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "expo-router";
import {
  signInWithGoogle,
  signOutFromGoogle,
  refreshUserFromFirestore,
} from "@/services/authService";

export function useGoogleAuth() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const user = useAuthStore((state) => state.user);
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

  const refresh = async () => {
    if (!user) {
      console.warn("❌ 유저 없음: 로그인 필요");
      return;
    }

    try {
      const updatedUser = await refreshUserFromFirestore(user.id);
      if (updatedUser) {
        setUser(updatedUser);
        console.log("✅ 유저 정보 새로고침 성공");
      }
    } catch (e) {
      console.error("❌ 유저 정보 새로고침 실패:", e);
    }
  };

  return { login, logout, refresh };
}
