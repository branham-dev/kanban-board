import styles from './UserHome.module.scss';
import { useState } from 'react';
import { Button, Modal, TaskView } from '../../components';
import { useFetchBoardQuery } from '../../api';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useLogout } from '@/features/auth/hooks';
import type { Task } from '@dashboard/types';

const UserHome = () => {
  const { boardId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const logout = useLogout();

  const { data: board, isLoading: fetchingBoard } = useFetchBoardQuery(boardId!, {
    skip: !boardId,
  });
  console.log(board);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setIsOpen(true);
    setSelectedTask(task);
  };

  if (fetchingBoard) {
    return <p>Loading...</p>;
  }

  if (!board) {
    return <p>Board not found</p>;
  }

  const isEmpty = board.columns.length === 0;

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
      {isOpen && <Modal onClick={() => setIsOpen(false)}> </Modal>}
      {isOpen && selectedTask && (
        <Modal onClick={() => setIsOpen(false)}>
          <TaskView task={selectedTask} columns={board.columns} />
        </Modal>
      )}
      <Button clickAction={logout}>Logout</Button>
    </main>
  );
};

export default UserHome;
