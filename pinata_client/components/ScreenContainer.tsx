import colors from "@/constants/Colors";
import spacing from "@/constants/spacing";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  ViewProps,
  View,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";

interface BaseLayoutProps extends ViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
  backgroundColor?: string;
  backgroundImage?: ImageSourcePropType; // ✅ 추가: 배경 이미지 prop
}

const BaseLayout = ({
  children,
  style,
  noPadding = false,
  backgroundColor = colors.bgWhite,
  backgroundImage,
  ...props
}: BaseLayoutProps) => {
  const Container = (
    <View
      style={[styles.container, noPadding && styles.noPadding, style]}
      {...props}
    >
      {children}
    </View>
  );

  return backgroundImage ? (
    <ImageBackground
      source={backgroundImage}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>{Container}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {Container}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
  },
  noPadding: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  imageBackground: {
    flex: 1,
  },
});

export default BaseLayout;
