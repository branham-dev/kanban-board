import React, { useState } from 'react';
import type { ModalType } from './types';
import ModalContext from './ModalContext';

type ModalProviderProps = {
  children: React.ReactNode;
};

function ModalProvider({ children }: ModalProviderProps) {
  const [activeModal, setActiveModal] = useState<ModalType>('none');

  const openModal = (modal: ModalType) => {
    if (activeModal === modal) {
      setActiveModal('none');
    } else {
      setActiveModal(modal);
    }
  };

  const closeModal = () => {
    setActiveModal('none');
  };

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
