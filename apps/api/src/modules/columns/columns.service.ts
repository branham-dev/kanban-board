import * as Model from './columns.model';
import { AppError } from '@/shared/errors/app.error';
import { newColumnSchema } from './columns.schema';
import type { NewColumn } from '@kanban/shared';
import z from 'zod';
import { flattenError } from '../auth/utils/flatten';

export const addColumn = async (payload: NewColumn, userId: string) => {
  // console.log("Payload: ", payload);
  if (!payload) {
    throw new AppError('Undefined column data', 400, null);
  }
  const validated = newColumnSchema.safeParse(payload);
  if (!validated.success) {
    const raw = z.treeifyError(validated.error);
    const errors = flattenError(raw);
    throw new AppError('Invalid column data', 400, errors);
  }

  const response = await Model.validateBoardOwner(payload.boardId);

  if (response == null) {
    throw new AppError('No board found', 404, null);
  }

  if (response.userId !== userId) {
    throw new AppError('You do not have access to this board!', 403, null);
  }

  const result = await Model.addColumn(payload);

  return;
};
