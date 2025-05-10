import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore"; // zustand에서 유저 상태 가져오기

export default function HomeView() {
  const router = useRouter();
  const { user } = useAuthStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>홈 화면입니다</Text>

      {user && (
        <View style={styles.userBox}>
          <Text style={styles.userText}>👋 {user.name}님, 환영합니다!</Text>
          <Text style={styles.userText}>보유한 공: 🎈 {user.ball}개</Text>
        </View>
      )}

      <Button title="게임으로 이동" onPress={() => router.push("/game")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userBox: {
    marginBottom: 20,
    alignItems: "center",
  },
  userText: {
    fontSize: 16,
    marginVertical: 4,
  },
});
