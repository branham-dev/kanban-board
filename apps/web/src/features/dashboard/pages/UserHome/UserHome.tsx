import styles from './UserHome.module.scss';
import { useEffect, useState } from 'react';
import { Button, Modal, NewBoard, NewColumn, TaskView } from '../../components';
import { useFetchBoardQuery } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useLogout } from '@/features/auth/hooks';
import type { Task } from '@dashboard/types';
import { useModal } from '@/app/providers/modal';
import { useAppSelector } from '@/app/store/hooks';
import type { RootState } from '@/app/store/appStore';

const UserHome = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const logout = useLogout();
  const { activeModal, openModal, closeModal } = useModal();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const lastBoardId = useAppSelector((state: RootState) => state.auth.user?.lastBoardId);

  const { data: board, isLoading: fetchingBoard } = useFetchBoardQuery(boardId!, {
    skip: !boardId,
  });

  useEffect(() => {
    if (!fetchingBoard && !board && lastBoardId && boardId !== lastBoardId) {
      navigate(`/dashboard/${lastBoardId}`, { replace: true });
    }
  }, [fetchingBoard, board, lastBoardId, boardId, navigate]);

  const handleTaskClick = (task: Task) => {
    openModal('taskView');
    setSelectedTask(task);
  };

  const handleNewColumn = () => {
    openModal('newColumn');
  };

  if (fetchingBoard) {
    return <p>Loading...</p>;
  }

  if (!board) {
    return null;
  }

  const isEmpty = board.columns.length === 0;

  return (
    <main className={styles.main}>
      {isEmpty ? (
        <div className={styles.emptyBoard}>
          <p>This board is empty. Create a new column to get started.</p>
          <Button onClick={handleNewColumn} className={styles.button}>
            + Add new column
          </Button>
        </div>
      ) : (
        <div className={styles.columnContainer}>
          {board.columns.map((column) => {
            const isColumnEmpty = column.tasks.length === 0;
            return (
              <section key={column.id} className={styles.column}>
                <h2>
                  {column.name.toUpperCase()} ({column.tasks.length})
                </h2>

                <div
                  className={clsx(styles.taskCardContainer, isColumnEmpty && styles.emptyColumn)}
                >
                  {column.tasks.map((task) => {
                    const subtasks = task.subtasks.length;
                    const isSubtasks = subtasks > 0;
                    const completed = task.subtasks.filter(
                      (subtask) => subtask.isCompleted === true,
                    );
                    return (
                      <button
                        key={task.id}
                        onClick={() => handleTaskClick(task)}
                        className={styles.taskCard}
                      >
                        <p>{task.title}</p>
                        <small>
                          {isSubtasks && `${completed.length} of`} {subtasks} subtasks
                        </small>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {activeModal === 'taskView' && selectedTask && (
        <Modal onClick={closeModal}>
          <TaskView task={selectedTask} columns={board.columns} />
        </Modal>
      )}
      {activeModal === 'newColumn' && (
        <Modal onClick={closeModal}>
          <NewColumn onClose={closeModal} />
        </Modal>
      )}
      {activeModal === 'newBoard' && (
        <Modal onClick={closeModal}>
          <NewBoard />
        </Modal>
      )}
      <Button onClick={logout}>Logout</Button>
    </main>
  );
};

export default UserHome;
