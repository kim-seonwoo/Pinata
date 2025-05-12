import { Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import BaseLayout from "@/components/ScreenContainer";
import typography from "@/constants/typography";
import CommonButton from "@/components/CommonButton";
import ThrowBallPlay from "@/components/game/ThrowBallPlay";

export default function GameView() {
  const router = useRouter();

  return (
    <BaseLayout>
      <Text style={typography.title}>게임 화면입니다</Text>
      <ThrowBallPlay />
      <CommonButton title="게임 종료하기" onPress={() => router.back()} />
    </BaseLayout>
  );
}
