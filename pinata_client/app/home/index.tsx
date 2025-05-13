import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
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
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {user && (
            <View style={styles.userInfo}>
              <Text style={typography.title}>
                👋 {user.name}님, 환영합니다!
              </Text>
              <Text style={typography.body}>📧 {user.email}</Text>
              <Text style={typography.body}>🎈 보유한 공: {user.ball}개</Text>

              {user.gift && user.gift.length > 0 && (
                <>
                  <Text style={[typography.subtitle, { marginTop: 20 }]}>
                    🎁 받은 선물
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.giftContainer}
                  >
                    {user.gift.map((item, index) => (
                      <View key={index} style={styles.giftCard}>
                        <Image
                          source={{ uri: item.imageUrl }}
                          style={styles.giftImage}
                          resizeMode="cover"
                        />
                        <Text style={styles.giftText}>{item.name}</Text>
                        <Text style={styles.giftDate}>{item.receivedAt}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </>
              )}
            </View>
          )}
        </ScrollView>

        {/* 고정된 하단 버튼 */}
        <View>
          <CommonButton
            title="게임으로 이동"
            onPress={() => router.push("/game")}
            size="large"
            buttonStyle={{ marginBottom: 12 }}
          />
          <CommonButton title="로그아웃" onPress={logout} size="large" />
        </View>
      </View>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  userInfo: {
    marginBottom: 24,
  },
  giftContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingLeft: 4,
  },
  giftCard: {
    width: 140,
    marginRight: 16,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  giftImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  giftText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  giftDate: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
});
