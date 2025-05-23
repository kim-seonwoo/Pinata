// screens/RewardedAdView.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";
import CommonButton from "@/components/CommonButton";
import { useAuthStore } from "@/stores/authStore";
import { getRewardAdUnitId } from "../util/adUnitId";

export default function RewardedAdView() {
  const adId = getRewardAdUnitId() ?? TestIds.REWARDED;

  const [loaded, setLoaded] = useState(false);
  const rewarded = useRef<RewardedAd>(
    RewardedAd.createForAdRequest(adId, {
      requestNonPersonalizedAdsOnly: true,
    })
  ).current;

  useEffect(() => {
    const loadAd = () => {
      rewarded.load();
    };

    const adEventListener = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log("✅ 보상형 광고 로드 완료");
        setLoaded(true);
      }
    );

    const earnRewardListener = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("🎉 보상 획득!", reward);
        Alert.alert("🎁 보상 지급", "공 10개를 획득했습니다!");

        // ✅ 공 10개 지급 로직
      }
    );

    const closeListener = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        setLoaded(false);
        rewarded.load(); // 광고 닫힌 후 다시 로드
      }
    );

    loadAd();

    return () => {
      adEventListener();
      earnRewardListener();
      closeListener();
    };
  }, []);

  const handleShowAd = () => {
    if (loaded) {
      rewarded.show();
    } else {
      Alert.alert("⏳ 준비 중", "아직 광고가 로드되지 않았습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 리워드 광고</Text>
      <Text style={styles.info}>광고를 보면 공 10개를 받을 수 있어요!</Text>

      <CommonButton
        title="🎬 광고 보고 보상받기"
        onPress={handleShowAd}
        size="large"
        buttonStyle={{ marginTop: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    textAlign: "center",
  },
});
