import React, { useEffect, useRef } from "react";
import { Animated, PanResponder, View, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import { useGame } from "@/hooks/useGame";
import GameResultPopup from "./GameResultPopup";
import { useAuthStore } from "@/stores/authStore";

export default function ThrowBallPlay() {
  const ballY = useRef(new Animated.Value(0)).current;
  const lottieRef = useRef<LottieView>(null);
  const boxX = useRef(new Animated.Value(0)).current;
  const { throwBall } = useGame(lottieRef, ballY, boxX);
  const { user } = useAuthStore();

  useEffect(() => {
    const animateBox = () => {
      const distance = Math.random() * 150 + 50; // 이동 범위 (50 ~ 200px)
      const duration = Math.random() * 1000 + 1000; // 속도 (1 ~ 2초)

      Animated.sequence([
        Animated.timing(boxX, {
          toValue: distance,
          duration,
          useNativeDriver: false,
        }),
        Animated.timing(boxX, {
          toValue: -distance,
          duration,
          useNativeDriver: false,
        }),
      ]).start(() => animateBox()); // 반복
    };

    animateBox();
  }, []);

  const handleReset = () => {
    ballY.setValue(0);
    lottieRef.current?.reset();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -100) throwBall(user?.id || "");
      },
    })
  ).current;

  return (
    <View style={styles.playContainer}>
      <Animated.View
        style={[styles.boxWrapper, { transform: [{ translateX: boxX }] }]}
      >
        <LottieView
          ref={lottieRef}
          source={require("../../assets/animations/gift_lottie.json")}
          autoPlay={false}
          loop={false}
          style={styles.lottie}
        />
      </Animated.View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.ball, { transform: [{ translateY: ballY }] }]}
      >
        <Image
          source={require("../../assets/images/ball.png")}
          style={{ width: 30, height: 30 }}
          resizeMode="contain"
        />
      </Animated.View>

      <GameResultPopup onReset={handleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  playContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  boxWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: 320,
    height: 320,
  },
  ball: {
    position: "absolute",
    bottom: 60,
    left: "50%",
    marginLeft: -15,
  },
});
