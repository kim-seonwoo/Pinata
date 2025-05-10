import { View, Text, StyleSheet } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";

export default function LoginView() {
  const { login } = useGoogleLogin();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab 김선우 화이팅</Text>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={login}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold" },
});
