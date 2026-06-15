import styles from './Modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Modal = ({ children, onClick: clickAction }: ModalProps) => {
  return (
    <div onClick={clickAction} className={styles.modal}>
      {children}
    </div>
  );
};

export default Modal;
