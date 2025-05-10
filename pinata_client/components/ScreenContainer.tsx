import colors from "@/constants/Colors";
import spacing from "@/constants/spacing";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  ViewProps,
  View,
} from "react-native";

interface BaseLayoutProps extends ViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
  backgroundColor?: string;
}

const BaseLayout = ({
  children,
  style,
  noPadding = false,
  backgroundColor = colors.bgWhite,
  ...props
}: BaseLayoutProps) => {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View
        style={[styles.container, noPadding && styles.noPadding, style]}
        {...props}
      >
        {children}
      </View>
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
});

export default BaseLayout;
