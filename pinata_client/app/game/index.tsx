import { Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import BaseLayout from "@/components/ScreenContainer";
import CommonButton from "@/components/CommonButton";
import ThrowBallPlay from "@/components/game/ThrowBallPlay";
import { useAuthStore } from "@/stores/authStore";

export default function GameView() {
  const router = useRouter();
  const ball = useAuthStore((state) => state.user?.ball ?? 0); // ✅ 공개수 구독

  return (
    <BaseLayout>
      <Text style={styles.ballCount}>🎾 {ball}</Text>
      <ThrowBallPlay />
      <CommonButton title="게임 종료하기" onPress={() => router.back()} />
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  ballCount: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
});
