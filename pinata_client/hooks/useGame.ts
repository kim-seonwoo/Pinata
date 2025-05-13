import { throwBallRequest } from "@/services/gameService";
import { useGameStore } from "@/stores/gameStore";
import { useAuthStore } from "@/stores/authStore";
import { ThrowBallResponse } from "@/types/throwBallResponse";
import { Audio } from "expo-av";
import { Animated, Alert } from "react-native";

export function useGame(
  lottieRef: React.RefObject<any>,
  ballY: Animated.Value,
  boxX: Animated.Value
) {
  const { setResult } = useGameStore();
  const { user, setUser, decreaseBall } = useAuthStore();

  const playSound = async (file: any) => {
    const { sound } = await Audio.Sound.createAsync(file);
    await sound.playAsync();
  };

  const isHit = () => Math.abs((boxX as any).__getValue()) < 50;

  const handleResult = async (res: ThrowBallResponse) => {
    setResult(res);

    if (res.updatedBall !== undefined && user) {
      setUser({ ...user, ball: res.updatedBall });
    }

    if (res.success) {
      await playSound(require("@/assets/sounds/success.mp3"));
    } else if (res.reason === "miss") {
      await playSound(require("@/assets/sounds/miss.mp3"));
    } else {
      await playSound(require("@/assets/sounds/fail.mp3"));
    }
  };

  const throwBall = async (userId: string) => {
    if (!user || user.ball <= 0) {
      Alert.alert("⚠️ 공이 부족합니다", "공을 충전해주세요!");
      return;
    }

    const hit = isHit();

    await playSound(require("@/assets/sounds/ballThrow.mp3"));

    Animated.timing(ballY, {
      toValue: -400,
      duration: 100,
      useNativeDriver: true,
    }).start(async () => {
      lottieRef.current?.reset();
      lottieRef.current?.play();

      const res = await throwBallRequest(userId, hit);
      console.log("🎯 서버 응답:", res);

      await handleResult(res);
    });
  };

  return { throwBall };
}
