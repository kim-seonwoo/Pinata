import React, { useEffect, useRef } from "react";
import { Animated, PanResponder, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useGame } from "@/hooks/useGame";
import GameResultPopup from "./GameResultPopup";
import { useAuthStore } from "@/stores/authStore";
import Target from "./Target";
import Ball from "./Ball";

export default function ThrowBallPlay() {
  const ballY = useRef(new Animated.Value(0)).current;
  const lottieRef = useRef<LottieView>(null);
  const boxX = useRef(new Animated.Value(0)).current;
  const { throwBall } = useGame(lottieRef, ballY, boxX);
  const { user } = useAuthStore();

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
      <Target boxX={boxX} lottieRef={lottieRef} />
      <Ball ballY={ballY} panHandlers={panResponder.panHandlers} />
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
});
