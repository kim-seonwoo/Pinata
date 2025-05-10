import { View, Text, StyleSheet } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import typography from "@/constants/typography";
import BaseLayout from "@/components/ScreenContainer";
import spacing from "@/constants/spacing";
import { useGoogleAuth } from "@/hooks/useGoogleLogin";

export default function LoginView() {
  const { login } = useGoogleAuth();

  return (
    <BaseLayout>
      <Text style={typography.h1}>박터뜨리기</Text>
      <GoogleSigninButton
        style={{ width: "100%", height: 48, marginTop: spacing.m }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={login}
      />
    </BaseLayout>
  );
}
