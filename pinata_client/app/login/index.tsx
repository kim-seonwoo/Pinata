import { Alert, View, Text, StyleSheet, Image } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import typography from "@/constants/typography";
import BaseLayout from "@/components/ScreenContainer";
import spacing from "@/constants/spacing";
import { useGoogleAuth } from "@/hooks/useGoogleLogin";
import React from "react";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import { useAppleAuth } from "@/hooks/useAppleLogin";

export default function LoginView() {
  const { login: googleLogin } = useGoogleAuth();
  const { login: appleLogin } = useAppleAuth();

  const handleAppleConsentAndLogin = () => {
    Alert.alert(
      "개인정보 수집 안내",
      "Apple 로그인을 통해 사용자 ID가 수집되며, 이는 인증 및 게임 데이터 저장에 사용됩니다.",
      [
        { text: "취소", style: "cancel" },
        { text: "동의하고 계속", onPress: appleLogin },
      ]
    );
  };

  const handleConsentAndLogin = () => {
    Alert.alert(
      "개인정보 수집 안내",
      "Google 로그인을 통해 이름과 이메일 주소를 수집하며, 이는 사용자 인증 및 게임 데이터 저장에 사용됩니다. 수집된 정보는 외부에 제공되지 않으며, 언제든지 삭제를 요청할 수 있습니다.",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "동의하고 계속",
          onPress: googleLogin,
        },
      ]
    );
  };

  return (
    <BaseLayout backgroundImage={require("@/assets/images/homeBack.png")}>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/ball.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[typography.h1, styles.title]}>박터뜨리기</Text>
        <Text style={[typography.body, styles.slogan]}>
          공을 던져서 박터뜨리기!
        </Text>
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleConsentAndLogin}
        />
        <AppleButton
          buttonStyle={AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.SIGN_IN}
          style={styles.appleButton}
          onPress={handleAppleConsentAndLogin}
        />
      </View>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.m,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: spacing.l,
  },
  title: {
    color: "#FFFFFF",
    opacity: 0.7,
    marginBottom: spacing.m,
    textAlign: "center",
  },
  slogan: {
    color: "#FFFFFF",
    opacity: 0.7,
    textAlign: "center",
    marginBottom: 4,
  },
  googleButton: {
    width: "100%",
    height: 48,
    marginTop: 80,
  },

  appleButton: {
    width: "100%",
    height: 48,
    marginTop: 12,
  },
});
