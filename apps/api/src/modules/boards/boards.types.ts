export type BoardData = {
  id: string;
  name: string;
  userId: string;
};

export type LastBoard = {
  userId: string;
  boardId: string;
};

export type LastBoardData = {
  boardData: string;
};

export type LastBoardParam = {
  userId: string;
  payload: LastBoardData;
};

export type ColumnData = {
  id: string;
  boardId: string;
  name: string;
  position: number;
};

export type Task = {
  id: string;
  columnId: string;
  title: string;
  description: string;
  position: number;
};

export type Subtask = {
  id: string;
  taskId: string;
  title: string;
  isCompleted: boolean;
};
