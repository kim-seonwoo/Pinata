import { StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
  User,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

export default function LoginView() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;
      if (!idToken) {
        throw new Error("Failed to retrieve idToken from userInfo.");
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Firebase 인증
      await auth().signInWithCredential(googleCredential);

      // 콘솔 출력
      console.log("로그인 성공");
      console.log("사용자 정보:", userInfo);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.warn("로그인 진행 중입니다.");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.warn("Play Services를 사용할 수 없습니다.");
            break;
          default:
            console.warn("알 수 없는 오류:", error.message);
        }
      } else {
        console.error("구글 로그인 오류:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab 김선우 화이팅</Text>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
