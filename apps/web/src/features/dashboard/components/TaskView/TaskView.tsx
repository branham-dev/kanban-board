import styles from './TaskView.module.scss';
import type { Column, Task } from '@dashboard/types';
import verticalEllipsis from '@/assets/icon-vertical-ellipsis.svg';
import chevronDown from '@/assets/icon-chevron-down.svg';
import { useState } from 'react';
import clsx from 'clsx';

type TaskViewProps = {
  task: Task;
  columns: Column[];
};

const TaskView = ({ task, columns }: TaskViewProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const subtasks = task.subtasks.length;
  const completed = task.subtasks.filter((subtask) => subtask.isCompleted === true).length;
  const isSubtasks = subtasks > 0;

  const currentColumn = columns.find((column) => column.id === task.columnId);

  return (
    <article onClick={(event) => event.stopPropagation()} className={styles.taskView}>
      <div className={styles.header}>
        <h3>{task.title}</h3>
        <button>
          <img src={verticalEllipsis} alt="icon" />
        </button>
      </div>
      <p className={styles.description}>{task.description}</p>
      <section className={styles.subtasks}>
        <h4 className={styles.title}>
          Subtasks({isSubtasks && `${completed} of `}
          {subtasks})
        </h4>
        <div className={styles.subtaskList}>
          {task.subtasks.map((subtask) => {
            return (
              <label key={subtask.id} className={styles.card}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  defaultChecked={subtask.isCompleted}
                />
                <p className={styles.title}>{subtask.title}</p>
              </label>
            );
          })}
        </div>
      </section>
      <section className={styles.currentStatus}>
        <h4>Current Status</h4>
        <button
          type="button"
          className={clsx(styles.trigger, isOpen && styles.open)}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{currentColumn?.name}</span>
          <img src={chevronDown} alt="icon" className={clsx(isOpen && styles.open)} />
        </button>
        <div className={clsx(styles.dropdown, isOpen && styles.open)}>
          <div className={clsx(styles.dropdownInner, isOpen && styles.open)}>
            {columns.map((column) => {
              return <button key={column.id}>{column.name}</button>;
            })}
          </div>
        </div>
      </section>
    </article>
  );
};

export default TaskView;
