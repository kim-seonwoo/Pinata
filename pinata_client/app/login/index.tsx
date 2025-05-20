import { View, Text, StyleSheet, Image } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import typography from "@/constants/typography";
import BaseLayout from "@/components/ScreenContainer";
import spacing from "@/constants/spacing";
import { useGoogleAuth } from "@/hooks/useGoogleLogin";

export default function LoginView() {
  const { login } = useGoogleAuth();

  return (
    <BaseLayout>
      <View style={styles.container}>
        <Text style={[typography.h1, styles.title]}>🎉 박터뜨리기 🎉</Text>
        <Text style={typography.h4}>공을 던져서 박터뜨리기!</Text>
        <Text style={typography.h4}>구글 계정으로 로그인 해주세요</Text>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={login}
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
    marginBottom: spacing.m,
  },
  googleButton: {
    width: "100%",
    height: 48,
    marginTop: 300,
  },
});
