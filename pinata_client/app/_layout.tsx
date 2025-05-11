import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    });
    return unsubscribe;
  }, []);

  return <Slot />;
}
