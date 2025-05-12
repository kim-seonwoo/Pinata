import React, { useRef, useState } from "react";
import { Animated, PanResponder, View, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";

export default function ThrowBallPlay() {
  const ballY = useRef(new Animated.Value(0)).current;
  const [hit, setHit] = useState(false);
  const lottieRef = useRef<LottieView>(null);

  const playThrowSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/ballThrow.mp3")
    );
    await sound.playAsync();
  };

  const playSuccessSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/success.mp3")
    );
    await sound.playAsync();
  };

  const playFailssSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/fail.mp3")
    );
    await sound.playAsync();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -100) {
          playThrowSound(); // 🎵 효과음 재생
          Animated.timing(ballY, {
            toValue: -400,
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            setHit(true);
            lottieRef.current?.reset();
            lottieRef.current?.play();
          });
        }
      },
    })
  ).current;

  return (
    <View style={styles.playContainer}>
      <View style={styles.boxWrapper}>
        <LottieView
          ref={lottieRef}
          source={require("../../assets/animations/gift_lottie.json")}
          autoPlay={false}
          loop={false}
          onAnimationFinish={() => {
            ballY.setValue(0);
            setHit(false);
            // playSuccessSound(); // 🎵 효과음 재생
            lottieRef.current?.reset();
            playFailssSound();
          }}
          style={styles.lottie}
        />
      </View>

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
    marginTop: 100,
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
    marginLeft: -10,
  },
});
