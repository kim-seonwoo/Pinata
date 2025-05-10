import { Slot } from "expo-router";
import { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";

export default function RootLayout() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName ?? "",
          email: firebaseUser.email ?? "",
          ball: 0,
        });
        router.replace("/login");
      } else {
        clearUser();
        router.replace("/home");
      }
    });
    return unsubscribe;
  }, []);

  return <Slot />;
}
