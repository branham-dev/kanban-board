export type BoardItem = {
  id: string;
  name: string;
};

export type BoardItemResponse = {
  success: boolean;
  message: string;
  data: BoardItem[];
};
