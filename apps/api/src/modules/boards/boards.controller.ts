import type { Context } from 'hono';
import * as Service from './boards.service';
import { AppError } from '@/shared/errors/app.error';

export const listAllBoards = async (c: Context) => {
  try {
    const user = c.get('user');
    const response = await Service.listAllBoards(user.userId);

    return c.json({ success: true, message: 'Boards fetched successfully', data: response }, 200);
  } catch (error) {
    console.log(error);
  }
};

export const createBoard = async (c: Context) => {
  try {
    const boardData = await c.req.json();
    const user = c.get('user');
    const response = await Service.createBoard(user.userId, boardData);
    return c.json({ success: true, message: 'Board created successfully', data: response }, 201);
  } catch (error) {
    if (error instanceof AppError) {
      return c.json(
        {
          success: false,
          message: error.message,
          error: error.errors,
        },
        error.statusCode,
      );
    } else {
      return c.json({ success: false, message: 'Internal Server Error' }, 500);
    }
  }
};
