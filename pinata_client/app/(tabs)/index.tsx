import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLIENT_ID } from "@env";

export default function LoginView() {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
  });
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken ?? null;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
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
        onPress={() => signIn()}
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
function setState(arg0: { userInfo: User }) {
  throw new Error("Function not implemented.");
}
