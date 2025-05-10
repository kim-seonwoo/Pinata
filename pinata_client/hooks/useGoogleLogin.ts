import { useAuthStore } from "@/stores/authStore";
import { signInWithGoogle } from "../services/authService";
import { useRouter } from "expo-router";

export function useGoogleLogin() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const login = async () => {
    try {
      const user = await signInWithGoogle();
      setUser(user);
      router.replace("/home");
    } catch (e) {
      // 에러는 authService에서 처리됨
    }
  };

  return { login };
}
