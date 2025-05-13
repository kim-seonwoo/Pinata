import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useCallback, useState } from "react";
import * as FileSystem from "expo-file-system";
import { useFocusEffect, useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { useGoogleAuth } from "@/hooks/useGoogleLogin";
import CommonButton from "@/components/CommonButton";
import BaseLayout from "@/components/ScreenContainer";
import typography from "@/constants/typography";

export default function HomeView() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { logout, refresh } = useGoogleAuth();

  useFocusEffect(
    useCallback(() => {
      refresh(); // 홈 진입 시 유저 데이터 최신화
    }, [])
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImagePress = (uri: string) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  const handleSaveImage = async () => {
    if (!selectedImage) return;

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "권한 필요",
          "이미지를 저장하려면 갤러리 접근 권한이 필요합니다."
        );
        return;
      }

      const fileUri = FileSystem.documentDirectory + "temp.jpg";
      const downloadResult = await FileSystem.downloadAsync(
        selectedImage,
        fileUri
      );

      if (!downloadResult || !downloadResult.uri) {
        Alert.alert("실패", "이미지를 다운로드하지 못했습니다.");
        return;
      }

      await MediaLibrary.saveToLibraryAsync(downloadResult.uri);
      Alert.alert("✅ 저장 완료", "이미지가 갤러리에 저장되었습니다.");
    } catch (err) {
      console.error("❌ 이미지 저장 중 오류:", err);
      Alert.alert("에러", "이미지 저장에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <BaseLayout>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {user && (
            <View style={styles.userInfo}>
              <Text style={typography.title}>{user.name}님, 환영합니다!</Text>
              <Text style={typography.title}>🎾 보유한 공: {user.ball}개</Text>

              {user.gift && user.gift.length > 0 && (
                <>
                  <Text style={[typography.subtitle, { marginTop: 20 }]}>
                    🎁 받은 선물
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.giftContainer}
                  >
                    {user.gift.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleImagePress(item.imageUrl)}
                        style={styles.giftCard}
                      >
                        <Image
                          source={{ uri: item.imageUrl }}
                          style={styles.giftImage}
                          resizeMode="cover"
                        />
                        <Text style={styles.giftText}>{item.name}</Text>
                        <Text style={styles.giftDate}>{item.receivedAt}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </>
              )}
            </View>
          )}
        </ScrollView>

        <View>
          <CommonButton
            title="게임으로 이동"
            onPress={() => router.push("/game")}
            size="large"
            buttonStyle={{ marginBottom: 12 }}
          />
          <CommonButton title="로그아웃" onPress={logout} size="large" />
        </View>
      </View>

      {/* 확대 이미지 모달 */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackground}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalContent}>
            {selectedImage && (
              <>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.modalImage}
                />
                <CommonButton
                  title="📥 이미지 저장하기"
                  onPress={handleSaveImage}
                  size="medium"
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  userInfo: {
    marginBottom: 24,
  },
  giftContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingLeft: 4,
  },
  giftCard: {
    width: 140,
    marginRight: 16,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  giftImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  giftText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  giftDate: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  modalImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginBottom: 12,
  },
});
