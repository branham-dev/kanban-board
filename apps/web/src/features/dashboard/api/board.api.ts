import { api } from '@/service/api';
import type { BoardItem, BoardItemResponse } from '../types';

export const boardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listBoards: builder.query<BoardItem[], void>({
      query: () => ({
        url: '/boards/all',
        method: 'GET',
      }),
      transformResponse: (response: BoardItemResponse) => {
        return response.data;
      },
    }),
  }),
});

export const { useListBoardsQuery: useListBoards } = boardApi;
