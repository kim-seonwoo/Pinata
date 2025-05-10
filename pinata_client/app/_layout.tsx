// app/_layout.tsx
import { Slot, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isLoggedIn === null) return;
    if (isLoggedIn) {
      router.replace("/home"); // ✅ 디렉토리 기준 라우트
    } else {
      router.replace("/login");
    }
  }, [isLoggedIn]);

  return <Slot />;
}
