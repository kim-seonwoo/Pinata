// components/ads/BannerAdComponent.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { getBannerAdUnitId } from "../util/adUnitId";

export default function BannerAdComponent() {
  const adUnitId = getBannerAdUnitId();

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId ?? ""}
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
