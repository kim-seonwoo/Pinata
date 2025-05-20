import { Platform } from 'react-native';

export const getRewardAdUnitId = () => {
  if (__DEV__) return 'ca-app-pub-3940256099942544/5224354917'; // 테스트 ID
  return Platform.select({
    ios: process.env.EXPO_PUBLIC_IOS_REWARD!,
    android: process.env.EXPO_PUBLIC_ANDROID_REWARD!,
  });
};

export const getBannerAdUnitId = () => {
  if (__DEV__) return 'ca-app-pub-3940256099942544/6300978111'; // 테스트 ID
  return Platform.select({
    ios: process.env.EXPO_PUBLIC_IOS_BANNER!,
    android: process.env.EXPO_PUBLIC_ANDROID_BANNER!,
  });
};
