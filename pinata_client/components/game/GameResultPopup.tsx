import { View, Text, Modal, Image, StyleSheet, Pressable } from "react-native";
import { useGameStore } from "@/stores/gameStore";
import CommonButton from "../CommonButton";

interface Props {
  onReset: () => void;
}

export default function GameResultPopup({ onReset }: Props) {
  const { result, reset } = useGameStore();

  if (!result) return null;

  return (
    <Modal transparent animationType="fade" visible>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {result.success ? (
            <>
              <Image
                source={{ uri: result.imageUrl }}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.text}>🎉 {result.name} 당첨!</Text>
            </>
          ) : (
            <Text style={styles.text}>❌ 꽝! 다음 기회에...</Text>
          )}
          <CommonButton
            title="확인"
            onPress={() => {
              reset();
              onReset();
            }}
          />
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
  popup: {
    width: 280,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
