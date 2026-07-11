import styles from './UserHome.module.scss';
import { useEffect, useState } from 'react';
import { Button, Modal, NewBoard, NewColumn, TaskView, ViewContainer } from '../../components';
import {
  useDeleteBoardMutation,
  useFetchBoardQuery,
  useListBoards,
  useUpdateLastBoardMutation,
} from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useLogout } from '@/features/auth/hooks';
import type { BoardItem, Task } from '@dashboard/types';
import { useModal } from '@/app/providers/modal';
import { useAppSelector } from '@/app/store/hooks';
import type { RootState } from '@/app/store/appStore';

const UserHome = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const logout = useLogout();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const lastBoardId = useAppSelector((state: RootState) => state?.auth.user?.lastBoardId);
  const { activeModal, openModal, closeModal } = useModal();

  const { data: board, isLoading: fetchingBoard } = useFetchBoardQuery(boardId!, {
    skip: !boardId,
  });
  const { data: boards } = useListBoards();
  const [deleteBoard] = useDeleteBoardMutation();
  const [updateLastBoard] = useUpdateLastBoardMutation();

  useEffect(() => {
    if (!fetchingBoard && !board && lastBoardId && boardId !== lastBoardId) {
      navigate(`/dashboard/${lastBoardId}`, { replace: true });
    }
  }, [fetchingBoard, board, lastBoardId, boardId, navigate]);

  const currentBoard = boards?.find((board) => board.id === boardId);

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

  const handleDeleteBoard = async (data: BoardItem) => {
    if (!boards || !boardId) return;
    const index = boards.findIndex((board) => board.id === boardId);

    const previousBoard = boards[index - 1];
    const nextBoard = boards[index + 1];

    const destination = previousBoard ?? nextBoard;

    console.log(data);
    try {
      const response = await deleteBoard(data.id).unwrap();
      console.log(response);
      closeModal();

      if (destination) {
        navigate(`/dashboard/${destination.id}`, { replace: true });
        await updateLastBoard(destination.id);
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentBoard) return null;

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
      {activeModal === 'deleteBoard' && (
        <Modal onClick={closeModal}>
          <ViewContainer>
            <div onClick={(e) => e.stopPropagation()} className={styles.deleteModal}>
              <h3 className={styles.deleteTitle}>Delete this board?</h3>
              <p className={styles.deleteDescription}>
                Are you sure you want to delete the ‘{currentBoard?.name}’ board? This action will
                remove all columns and tasks and cannot be reversed.
              </p>
              <div className={styles.buttonsContainer}>
                <button
                  onClick={() => handleDeleteBoard(currentBoard)}
                  className={clsx(styles.modalButton, styles.deleteButton)}
                >
                  Delete
                </button>
                <button
                  onClick={closeModal}
                  className={clsx(styles.modalButton, styles.cancelButton)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </ViewContainer>
        </Modal>
      )}
      <Button onClick={logout}>Logout</Button>
    </main>
  );
};

export default UserHome;
