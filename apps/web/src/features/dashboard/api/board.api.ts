import { api } from '@/service/api';
import type { Board, BoardItem, BoardItemResponse, Response } from '../types';

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
    updateLastBoard: builder.mutation<void, string>({
      query: (boardId) => ({
        url: '/users/preferences/last-board',
        method: 'PATCH',
        body: { boardId },
      }),
    }),
    fetchBoard: builder.query<Board, string>({
      query: (boardId) => ({
        url: `/dashboard/${boardId}`,
        method: 'GET',
      }),
      transformResponse: (response: Response<Board>) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useListBoardsQuery: useListBoards,
  useUpdateLastBoardMutation,
  useFetchBoardQuery,
} = boardApi;
