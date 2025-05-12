import { throwBallRequest } from "@/services/gameService";
import { useGameStore } from "@/stores/gameStore";
import { useAuthStore } from "@/stores/authStore"; // ✅ 공 관리용
import { ThrowBallResponse } from "@/types/throwBallResponse";
import { Audio } from "expo-av";
import { Animated, Alert } from "react-native";

export function useGame(
  lottieRef: React.RefObject<any>,
  ballY: Animated.Value
) {
  const { setResult } = useGameStore();
  const { user, decreaseBall } = useAuthStore();

  const playSound = async (file: any) => {
    const { sound } = await Audio.Sound.createAsync(file);
    await sound.playAsync();
    // await sound.unloadAsync();
  };

  const throwBall = async (userId: string) => {
    if (!user || user.ball <= 0) {
      Alert.alert("⚠️ 공이 부족합니다", "공을 충전해주세요!");
      return;
    }

    // 🎯 공 차감
    decreaseBall();
    await playSound(require("@/assets/sounds/ballThrow.mp3"));

    Animated.timing(ballY, {
      toValue: -400,
      duration: 100,
      useNativeDriver: true,
    }).start(async () => {
      lottieRef.current?.reset();
      lottieRef.current?.play();

      const res: ThrowBallResponse = await throwBallRequest(userId);
      console.log("🎯 서버 응답:", res);
      setResult(res);

      if (res.success) {
        await playSound(require("@/assets/sounds/success.mp3"));
      } else {
        await playSound(require("@/assets/sounds/fail.mp3"));
      }
    });
  };

  return { throwBall };
}
