import React from "react";
import { Modal, View, Pressable, Image, StyleSheet, Alert } from "react-native";
import CommonButton from "@/components/CommonButton";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useModalStore } from "@/stores/modalStore";

export default function EnlargedImageModal() {
  const { modalVisible, selectedImage, closeImageModal } = useModalStore(); // 예시 store 사용

  const handleSaveImage = async () => {
    try {
      if (!selectedImage) {
        Alert.alert("에러", "저장할 이미지가 없습니다.");
        return;
      }

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("권한 필요", "갤러리 접근 권한이 필요합니다.");
        return;
      }

      const fileUri = FileSystem.documentDirectory + "temp.jpg";
      const downloadResult = await FileSystem.downloadAsync(
        selectedImage,
        fileUri
      );

      await MediaLibrary.saveToLibraryAsync(downloadResult.uri);
      Alert.alert("✅ 저장 완료", "이미지가 저장되었습니다.");
    } catch (err) {
      Alert.alert("에러", "이미지 저장 실패");
    }
  };

  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Pressable style={styles.background} onPress={closeImageModal} />
        <View style={styles.content}>
          {selectedImage && (
            <>
              <Image source={{ uri: selectedImage }} style={styles.image} />
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
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    width: "85%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginBottom: 12,
  },
});
