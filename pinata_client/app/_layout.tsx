import { Slot } from "expo-router";
import { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import mobileAds from "react-native-google-mobile-ads";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // ✅ 광고 초기화
    mobileAds()
      .initialize()
      .then(() => {
        console.log("✅ AdMob SDK 초기화 완료");
      });

    // ✅ 인증 상태 감지
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
