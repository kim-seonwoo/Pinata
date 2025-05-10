import { Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import BaseLayout from "@/components/ScreenContainer";
import typography from "@/constants/typography";

export default function GameView() {
  const router = useRouter();

  return (
    <BaseLayout>
      <Text style={typography.title}>게임 화면입니다</Text>
      <Button title="게임 종료하기" onPress={() => router.back()} />
    </BaseLayout>
  );
}
