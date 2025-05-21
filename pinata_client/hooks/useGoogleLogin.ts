import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "expo-router";
import {
  signInWithGoogle,
  signOutFromGoogle,
  refreshUserFromFirestore,
} from "@/services/authService";
import auth from "@react-native-firebase/auth";

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
    try {
      const firebaseUser = auth().currentUser;

      if (!firebaseUser) {
        console.warn("❌ Firebase 로그인 정보 없음");
        return;
      }

      const updatedUser = await refreshUserFromFirestore(firebaseUser.uid);
      if (updatedUser) {
        setUser(updatedUser);
        console.log("✅ Firebase + Firestore 유저 정보 동기화 성공");
      }
    } catch (e) {
      console.error("❌ 유저 정보 새로고침 실패:", e);
    }
  };

  return { login, logout, refresh };
}
