import React from "react";
import {
  Animated,
  Image,
  StyleSheet,
  PanResponderGestureState,
} from "react-native";

interface Props {
  ballY: Animated.Value;
  panHandlers: any;
}

export default function Ball({ ballY, panHandlers }: Props) {
  return (
    <Animated.View
      {...panHandlers}
      style={[styles.ball, { transform: [{ translateY: ballY }] }]}
    >
      <Image
        source={require("../../assets/images/ball.png")}
        style={{ width: 50, height: 50 }}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ball: {
    position: "absolute",
    bottom: 60,
    left: "50%",
    marginLeft: -15,
  },
});
