import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
} from "@react-native-google-signin/google-signin";
import type { User } from "../types/user";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});

export const signInWithGoogle = async (): Promise<User> => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.data?.idToken;
    if (!idToken) throw new Error("idToken이 존재하지 않음");

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);
    const firebaseUser = userCredential.user;

    const uid = firebaseUser.uid;
    const email = firebaseUser.email ?? "";
    const name = firebaseUser.displayName ?? "";

    const userRef = firestore().collection("users").doc(uid);
    const snapshot = await userRef.get();

    let userData: User;

    if (!snapshot.exists()) {
      userData = {
        id: uid,
        name,
        email,
        ball: 0,
      };
      await userRef.set(userData);
      console.log("✅ Firestore에 신규 유저 등록됨:", userData);
    } else {
      userData = snapshot.data() as User;
      console.log("✅ 기존 유저 불러옴:", userData);
    }

    return userData;
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

export const signOutFromGoogle = async () => {
  try {
    await auth().signOut();
    console.log("✅ Firebase에서 로그아웃 성공");
  } catch (error) {
    console.error("❌ 로그아웃 실패:", error);
    throw error;
  }
};

export const refreshUserFromFirestore = async (
  uid: string
): Promise<User | null> => {
  try {
    const snapshot = await firestore().collection("users").doc(uid).get();
    if (!snapshot.exists) {
      console.warn("❌ Firestore에 유저 정보 없음");
      return null;
    }

    const user = snapshot.data() as User;
    return user;
  } catch (error) {
    console.error("❌ Firestore 유저 정보 가져오기 실패:", error);
    throw error;
  }
};

// authService.ts 내부에 추가
export const rewardUserWithBall = async (
  uid: string,
  amount: number = 10
): Promise<User | null> => {
  const userRef = firestore().collection("users").doc(uid);

  try {
    await firestore().runTransaction(async (transaction) => {
      const snapshot = await transaction.get(userRef);
      if (!snapshot.exists) {
        throw new Error("유저 문서가 존재하지 않음");
      }

      const currentBall = snapshot.data()?.ball ?? 0;
      const newBall = currentBall + amount;

      transaction.update(userRef, { ball: newBall });
    });

    // 보상 후 유저 정보 최신화
    const updatedSnapshot = await userRef.get();
    return updatedSnapshot.data() as User;
  } catch (error) {
    console.error("❌ 공 보상 실패:", error);
    throw error;
  }
};
