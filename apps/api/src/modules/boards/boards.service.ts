import { AppError } from '@/shared/errors/app.error';
import * as Model from './boards.model';
import { boardIdSchema, createBoardSchema } from './boards.schema';
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
  const validated = boardIdSchema.safeParse(payload);

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

export const listBoard = async (payload: unknown, userId: string) => {
  if (!payload) {
    throw new AppError('Undefined board identity', 400, null);
  }
  const validated = boardIdSchema.safeParse({ boardId: payload });
  if (!validated.success) {
    throw new AppError('Invalid board ID', 422, null);
  }
  const boardId = validated.data.boardId;

  const board = await Model.listBoard(boardId as string);

  if (board == null) {
    throw new AppError('Board does not exist', 404, null);
  }
  if (board.userId !== userId) {
    throw new AppError('You do not have access to this board', 403, null);
  }

  const columns = await Model.listColumns(boardId);
  const columnIds = columns.map((column) => column.id);
  const tasks = await Model.listTasks(columnIds);
  const taskIds = tasks.map((task) => task.id);
  const subTasks = await Model.listSubtasks(taskIds);

  const columnsWithTasks = columns.map((column) => {
    const tasksForColumn = tasks.filter((task) => task.columnId === column.id);

    const tasksWithSubtasks = tasksForColumn.map((task) => {
      const subTasksForTask = subTasks.filter((subtask) => subtask.taskId === task.id);

      return {
        ...task,
        subtasks: subTasksForTask,
      };
    });

    return {
      ...column,
      tasks: tasksWithSubtasks,
    };
  });

  console.log(columnsWithTasks);

  return {
    id: board.id,
    name: board.name,
    columns: columnsWithTasks,
  };
};
