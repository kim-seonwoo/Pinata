// stores/modalStore.ts
import { create } from "zustand";

interface ModalStore {
  modalVisible: boolean;
  selectedImage: string | null;
  openImageModal: (imageUrl: string) => void;
  closeImageModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modalVisible: false,
  selectedImage: null,

  openImageModal: (imageUrl) =>
    set({
      modalVisible: true,
      selectedImage: imageUrl,
    }),

  closeImageModal: () =>
    set({
      modalVisible: false,
      selectedImage: null,
    }),
}));
