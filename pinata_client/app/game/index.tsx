import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function GameView() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>게임 화면입니다</Text>
      <Button title="게임 종료하기" onPress={() => router.replace("/home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});
