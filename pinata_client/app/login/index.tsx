import { View, Text, StyleSheet } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";
import typography from "@/constants/typography";
import BaseLayout from "@/components/ScreenContainer";

export default function LoginView() {
  const { login } = useGoogleLogin();

  return (
    <BaseLayout>
      <Text style={typography.h1}>박터뜨리기</Text>
      <GoogleSigninButton
        style={{ width: 300, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={login}
      />
    </BaseLayout>
  );
}
