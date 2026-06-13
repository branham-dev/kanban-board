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
