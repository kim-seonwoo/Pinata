// hooks/useRewardedAd.ts
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

export function useRewardedAd(onReward: () => void) {
  const [loaded, setLoaded] = useState(false);
  const rewarded = useRef(
    RewardedAd.createForAdRequest(TestIds.REWARDED, {
      requestNonPersonalizedAdsOnly: true,
    })
  ).current;

  useEffect(() => {
    const load = () => rewarded.load();

    const loadListener = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => setLoaded(true)
    );

    const rewardListener = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        onReward();
      }
    );

    const closeListener = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        setLoaded(false);
        rewarded.load(); // 광고 다시 로드
      }
    );

    load();

    return () => {
      loadListener();
      rewardListener();
      closeListener();
    };
  }, [onReward]);

  const show = () => {
    if (loaded) {
      rewarded.show();
    } else {
      Alert.alert("광고 준비 중", "잠시 후 다시 시도해 주세요.");
    }
  };

  return { show };
}
