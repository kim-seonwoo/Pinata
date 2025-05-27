import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CommonButton from "@/components/CommonButton";
import typography from "@/constants/typography";
import colors from "@/constants/Colors";

type UserSummaryProps = {
  user: {
    name: string;
    ball: number;
  };
  onEarnBall: () => void;
};

export default function UserSummary({ user, onEarnBall }: UserSummaryProps) {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: -BOX_WIDTH,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View>
      <Text style={typography.h2}>👤 {user.name}</Text>
      <Text style={typography.caption}>매일 공 10개가 생성됩니다.</Text>
      <View style={styles.boxWrapper}>
        {/* 흐르는 그라데이션 테두리 */}
        <View style={styles.borderWrapper}>
          <Animated.View
            style={[
              {
                width: BOX_WIDTH * 2,
                height: BOX_HEIGHT,
                transform: [{ translateX }],
              },
              styles.gradientContainer,
            ]}
          >
            <LinearGradient
              colors={["#FF6FD8", "#3813C2", "#FF6FD8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            />
          </Animated.View>
        </View>

        {/* 안쪽 내용 */}
        <View style={styles.innerBox}>
          <Text style={styles.ballText}>🎾 {user.ball}</Text>
        </View>
      </View>

      <CommonButton
        title="공 얻으러 가기"
        onPress={onEarnBall}
        size="medium"
        buttonStyle={{ marginTop: 16 }}
      />
    </View>
  );
}

const BOX_WIDTH = 180;
const BOX_HEIGHT = 60;
const BORDER_WIDTH = 4;

const styles = StyleSheet.create({
  boxWrapper: {
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  borderWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    padding: BORDER_WIDTH,
    overflow: "hidden",
  },
  gradientContainer: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  gradient: {
    flex: 1,
    borderRadius: 12,
  },
  innerBox: {
    width: BOX_WIDTH - BORDER_WIDTH * 2,
    height: BOX_HEIGHT - BORDER_WIDTH * 2,
    borderRadius: 10,
    backgroundColor: colors.primaryPurple,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  ballText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
