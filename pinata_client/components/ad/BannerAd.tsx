// components/ads/BannerAdComponent.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

export default function BannerAdComponent() {
  const testAdUnitId = "ca-app-pub-8132109935097205/5275538050"; // 고정 크기 배너 테스트용

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={testAdUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => console.log("📢 배너 광고 로딩 완료")}
        onAdFailedToLoad={(error) => console.log("⚠️ 광고 로딩 실패:", error)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 16,
    marginBottom: 32,
  },
});
