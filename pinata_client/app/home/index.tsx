import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { useGoogleAuth } from "@/hooks/useGoogleLogin";
import CommonButton from "@/components/CommonButton";
import BaseLayout from "@/components/ScreenContainer";
import typography from "@/constants/typography";

export default function HomeView() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { logout } = useGoogleAuth();
  return (
    <BaseLayout>
      <Text style={typography.title}>홈 화면입니다</Text>

      {user && (
        <View>
          <Text style={typography.title}>👋 {user.name}님, 환영합니다!</Text>
          <Text style={typography.title}>보유한 공: 🎈 {user.ball}개</Text>
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
