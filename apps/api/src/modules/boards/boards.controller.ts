import type { Context } from 'hono';
import * as Service from './boards.service';

export const listAllBoards = async (c: Context) => {
  const user = c.get('user');
  const response = await Service.listAllBoards(user.userId);

  return c.json({ success: true, message: 'Boards fetched successfully', data: response }, 200);
};

export const createBoard = async (c: Context) => {
  const boardData = await c.req.json();
  const user = c.get('user');
  const response = await Service.createBoard(user.userId, boardData);
  return c.json({ success: true, message: 'Board created successfully', data: response }, 201);
};
