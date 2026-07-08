export type ModalType = 'none' | 'newBoard' | 'newColumn' | 'taskView';

export type ModalContextType = {
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
};
