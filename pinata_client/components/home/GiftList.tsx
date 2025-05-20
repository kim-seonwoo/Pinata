import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
} from "react-native";
import typography from "@/constants/typography";
import { useModalStore } from "@/stores/modalStore";

interface Gift {
  imageUrl: string;
  name: string;
  receivedAt: string;
}

interface GiftListProps {
  gifts: Gift[];
}

export default function GiftList({ gifts }: GiftListProps) {
  const { openImageModal } = useModalStore(); // 예시 함수

  return (
    <View>
      <Text style={[typography.subtitle, { marginTop: 20 }]}>🎁 받은 선물</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {gifts.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => openImageModal(item.imageUrl)}
            style={styles.card}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.date}>{item.receivedAt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingLeft: 4,
  },
  card: {
    width: 140,
    marginRight: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
});
