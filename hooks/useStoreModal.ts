import { create } from "zustand";

interface IUseStoreModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useStoreModal = create<IUseStoreModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useStoreModal;
