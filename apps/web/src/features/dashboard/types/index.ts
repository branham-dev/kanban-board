export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

export type BoardItem = {
  id: string;
  name: string;
};

export type BoardItemResponse = {
  success: boolean;
  message: string;
  data: BoardItem[];
};

type Subtask = {
  id: string;
  taskId: string;
  title: string;
  isCompleted: boolean;
};

type Task = {
  columnId: string;
  id: string;
  title: string;
  description: string;
  position: number;
  subtasks: Subtask[];
};

type Column = {
  boardId: string;
  id: string;
  name: string;
  position: number;
  tasks: Task[];
};

export type Board = {
  id: string;
  name: string;
  columns: Column[];
};
