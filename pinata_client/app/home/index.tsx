import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeView() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>홈 화면입니다</Text>
      <Button title="게임으로 이동" onPress={() => router.push("/game")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체 사용
    justifyContent: "center", // 수직 중앙 정렬
    alignItems: "center", // 수평 중앙 정렬
    padding: 24, // 여백
    backgroundColor: "#fff", // 배경색 (선택)
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20, // 버튼과 간격
  },
});
