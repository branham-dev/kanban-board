export type ModalType =
  | 'none'
  | 'newBoard'
  | 'newColumn'
  | 'taskView'
  | 'boardActions'
  | 'deleteBoard';

export type ModalContextType = {
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
};
