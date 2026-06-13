import { AppError } from '@/shared/errors/app.error';
import * as Model from './boards.model';
import { createBoardSchema, updateLastBoardSchema } from './boards.schema';
import { z } from 'zod';
import { flattenError } from '../auth/utils/flatten';

export const listAllBoards = async (userId: string) => {
  if (userId === undefined || userId === null) {
    throw new AppError('Undefined user ID', 409, null);
  }
  const response = await Model.listAllBoards(userId);

  if (response == null) {
    throw new Error();
  }
  return response;
};

export const createBoard = async (userId: string, payload: { name: string; position: number }) => {
  const validated = createBoardSchema.safeParse(payload);
  if (!validated.success) {
    const raw = z.treeifyError(validated.error);
    const errors = flattenError(raw);
    throw new AppError('Invalid Credentials', 400, errors);
  }
  const response = await Model.createBoard(userId, payload.name, payload.position);

  return response;
};

export const updateLastBoard = async (userId: string, payload: { boardId: string }) => {
  const validated = updateLastBoardSchema.safeParse(payload);

  if (!validated.success) {
    throw new AppError('Invalid board ID', 422, null);
  }
  const response = await Model.findBoard(payload.boardId);

  if (!response) {
    throw new AppError('Board not found', 404, null);
  }

  if (response.userId !== userId) {
    throw new AppError('You do not have access to this board', 403, null);
  }

  await Model.updateLastBoard(userId, payload.boardId);

  // console.log(response.userId);

  return response;
};
