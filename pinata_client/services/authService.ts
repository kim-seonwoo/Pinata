import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
} from "@react-native-google-signin/google-signin";
import type { User } from "../types/user";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.data?.idToken;
    if (!idToken) throw new Error("idToken이 존재하지 않음");

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);

    const firebaseUser = userCredential.user;
    const user: User = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName ?? "",
      email: firebaseUser.email ?? "",
      ball: 0,
    };
    console.log(user);
    return user;
  } catch (error: any) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          console.warn("로그인 진행 중");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.warn("Play Services 사용 불가");
          break;
        default:
          console.warn("에러:", error.message);
      }
    } else {
      console.error("로그인 실패:", error);
    }
    throw error;
  }
};
