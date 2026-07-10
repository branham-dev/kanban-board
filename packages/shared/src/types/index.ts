export type NewColumn = {
  name: string;
  boardId: string;
  position: number;
};

export type CreateBoardPayload = {
  name: string;
  columns: Array<{
    name: string;
  }>;
};
