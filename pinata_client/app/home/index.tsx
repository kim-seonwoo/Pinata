// screens/HomeView.tsx
import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { useGoogleAuth } from "@/hooks/useGoogleLogin";
import { useRewardedAd } from "@/hooks/useRewardAd";
import BaseLayout from "@/components/ScreenContainer";
import BannerAdComponent from "@/components/ad/BannerAd";
import UserSummary from "@/components/home/UserSummary";
import GiftList from "@/components/home/GiftList";
import HomeFooterButtons from "@/components/home/HomeFooterButton";
import EnlargedImageModal from "@/components/home/EarnImageModal";
import { rewardUserWithBall } from "@/services/authService";

export default function HomeView() {
  const { user } = useAuthStore();
  const { logout, refresh } = useGoogleAuth();
  const { setUser } = useAuthStore.getState();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [])
  );

  const onReward = async () => {
    if (!user) {
      Alert.alert("❌ 실패", "사용자 정보가 없습니다.");
      return;
    }
    try {
      const updatedUser = await rewardUserWithBall(user.id);
      if (updatedUser) {
        setUser(updatedUser); // ✅ 상태 업데이트
        Alert.alert("🎁 보상 완료", "공 10개가 지급되었습니다!");
      } else {
        Alert.alert("❌ 실패", "업데이트된 사용자 정보를 받아오지 못했습니다.");
      }
    } catch (err) {
      console.error("보상 지급 실패", err);
      Alert.alert("❌ 실패", "서버와 연결 중 문제가 발생했습니다.");
    }
  };

  const { show: showRewardAd } = useRewardedAd(onReward);

  return (
    <BaseLayout backgroundImage={require("@/assets/images/homeBack.png")}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {user && (
            <>
              <UserSummary user={user} onEarnBall={showRewardAd} />
              {user.gift && user.gift.length > 0 && (
                <GiftList gifts={user.gift} />
              )}
            </>
          )}
        </ScrollView>

        <HomeFooterButtons
          onLogout={logout}
          onGame={() => router.push("/game")}
        />
      </View>
      <BannerAdComponent />
      <EnlargedImageModal />
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
});
