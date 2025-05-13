import React, { useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

interface Props {
  boxX: Animated.Value;
  lottieRef: React.RefObject<LottieView | null>;
}

export default function Target({ boxX, lottieRef }: Props) {
  useEffect(() => {
    const animateBox = () => {
      const distance = Math.random() * 150 + 50;
      const duration = Math.random() * 1000 + 1000;

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
      ]).start(() => animateBox());
    };

    animateBox();
  }, []);

  return (
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
  );
}

const styles = StyleSheet.create({
  boxWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: 320,
    height: 320,
  },
});
