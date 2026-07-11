import styles from './ActionsView.module.scss';
import clsx from 'clsx';
import { useModal } from '@/app/providers/modal';

const ActionsView = () => {
  const { activeModal, openModal } = useModal();

  const isOpen = activeModal === 'boardActions';

  return (
    <div className={clsx(styles.view, isOpen && styles.open)}>
      <div className={styles.container}>
        <p className={styles.viewButton}>Edit Board</p>
        <p onClick={() => openModal('deleteBoard')} className={styles.viewButton}>
          Delete Board
        </p>
      </div>
    </div>
  );
};

export default ActionsView;
