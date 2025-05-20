import React from "react";
import { View } from "react-native";
import CommonButton from "@/components/CommonButton";

type HomeFooterButtonsProps = {
  onGame: () => void;
  onLogout: () => void;
};

export default function HomeFooterButtons({
  onGame,
  onLogout,
}: HomeFooterButtonsProps) {
  return (
    <View>
      <CommonButton
        title="게임으로 이동"
        onPress={onGame}
        size="large"
        buttonStyle={{ marginBottom: 12 }}
      />
      <CommonButton title="로그아웃" onPress={onLogout} size="large" />
    </View>
  );
}
