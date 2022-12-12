import create from 'zustand';

interface ModalState {
  isModalOpen: boolean;
  setModal: (m: boolean) => void;
}

export const useModalStore = create<ModalState>()(set => ({
  isModalOpen: false,
  setModal: (m: boolean) => set(() => ({ isModalOpen: m })),
}));
