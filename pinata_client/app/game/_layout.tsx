import { Stack } from "expo-router";

export default function GameLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "게임 화면", headerShown: true }}
      />
    </Stack>
  );
}
