import { api } from '@/service/api';
import type { AddColumnPayload, Board, BoardItem, BoardItemResponse, Response } from '../types';
import type { CreateBoardPayload } from '@kanban/shared';

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
      providesTags: ['Boards'],
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
      providesTags: ['Board'],
    }),
    addColumn: builder.mutation<unknown, AddColumnPayload>({
      query: (payload) => {
        console.log('Payload:', payload);
        return {
          url: 'board/add-column',
          method: 'POST',
          body: { payload },
        };
      },
      invalidatesTags: ['Board'],
    }),
    createBoard: builder.mutation<Board, CreateBoardPayload>({
      query: (payload) => {
        return {
          url: 'board/create',
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['Boards'],
      transformResponse: (response: Response<Board>) => {
        return response.data;
      },
    }),
    deleteBoard: builder.mutation<void, string>({
      query: (boardId) => ({
        url: `/board/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),
  }),
});

export const {
  useListBoardsQuery: useListBoards,
  useUpdateLastBoardMutation,
  useFetchBoardQuery,
  useAddColumnMutation,
  useCreateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;
