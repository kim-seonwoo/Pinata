import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CommonButton from "@/components/CommonButton";
import typography from "@/constants/typography";

type UserSummaryProps = {
  user: {
    name: string;
    ball: number;
  };
  onEarnBall: () => void;
};

export default function UserSummary({ user, onEarnBall }: UserSummaryProps) {
  return (
    <View>
      <Text style={typography.h2}>{user.name}님, 환영합니다!</Text>
      <Text style={typography.h3}>🎾 보유한 공: {user.ball}개</Text>
      <CommonButton
        title="공 얻으러 가기"
        onPress={onEarnBall}
        size="medium"
        buttonStyle={{ marginTop: 12 }}
      />
    </View>
  );
}
