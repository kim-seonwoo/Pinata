import { View, Text, StyleSheet, Image } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import typography from "@/constants/typography";
import BaseLayout from "@/components/ScreenContainer";
import spacing from "@/constants/spacing";
import { useGoogleAuth } from "@/hooks/useGoogleLogin";

export default function LoginView() {
  const { login } = useGoogleAuth();

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
        <Text style={[typography.body, styles.slogan]}>
          기프티콘을 획득해보세요!
        </Text>
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
});
