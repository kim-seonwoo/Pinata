import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore"; // zustand에서 유저 상태 가져오기
import { useGoogleAuth } from "@/hooks/useGoogleLogin";
import CommonButton from "@/components/CommonButton";
import BaseLayout from "@/components/ScreenContainer";

export default function HomeView() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { logout } = useGoogleAuth();
  return (
    <BaseLayout>
      <Text style={styles.title}>홈 화면입니다</Text>

      {user && (
        <View style={styles.userBox}>
          <Text style={styles.userText}>👋 {user.name}님, 환영합니다!</Text>
          <Text style={styles.userText}>보유한 공: 🎈 {user.ball}개</Text>
        </View>
      )}

      <CommonButton
        title="게임으로 이동"
        onPress={() => router.push("/game")}
        size="large"
        buttonStyle={{ marginBottom: 12 }}
      />
      <CommonButton
        title="로그아웃"
        onPress={() => {
          logout();
        }}
        size="large"
        buttonStyle={{ marginBottom: 12 }}
      />
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
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
