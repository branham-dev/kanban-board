import styles from './UserHome.module.scss';
import { useState } from 'react';
import { Button, Modal } from '../../components';
import { useFetchBoardQuery } from '../../api';
import { useParams } from 'react-router-dom';

const UserHome = () => {
  const { boardId } = useParams();
  const [isEmpty] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { data: board } = useFetchBoardQuery(boardId!, {
    skip: !boardId,
  });
  console.log(board);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <main className={styles.main}>
      {isEmpty ? (
        <div className={styles.emptyBoard}>
          <p>This board is empty. Create a new column to get started.</p>
          <Button clickAction={handleClick} className={styles.button}>
            + Add new column
          </Button>
        </div>
      ) : (
        <div>Colums</div>
      )}
      {isOpen && <Modal onClick={() => setIsOpen(false)}> </Modal>}
    </main>
  );
};

export default UserHome;
