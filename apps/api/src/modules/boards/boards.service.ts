import { AppError } from '@/shared/errors/app.error';
import * as Model from './boards.model';
import { createBoardSchema } from './boards.schema';
import { z } from 'zod';
import { flattenError } from '../auth/utils/flatten';
import { classifyError } from '@/shared/errors/classifyError';

export const listAllBoards = async (userId: string) => {
  try {
    if (userId === undefined || userId === null) {
      throw new AppError('Undefined user ID', 409, null);
    }
    const response = await Model.listAllBoards(userId);

    if (response == null) {
      throw new Error();
    }
    // console.log(response);
    return response;
  } catch (error) {
    throw classifyError(error);
  }
};

export const createBoard = async (userId: string, payload: { name: string; position: number }) => {
  try {
    const validated = createBoardSchema.safeParse(payload);
    if (!validated.success) {
      const raw = z.treeifyError(validated.error);
      const errors = flattenError(raw);
      throw new AppError('Invalid Credentials', 400, errors);
    }
    const response = await Model.createBoard(userId, payload.name, payload.position);
    // console.log(response);
    return response;
  } catch (error) {
    throw classifyError(error);
  }
};
