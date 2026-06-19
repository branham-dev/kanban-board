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

export const updateLastBoard = async (c: Context) => {
  const boardData = await c.req.json();
  const { userId } = c.get('user');
  const response = await Service.updateLastBoard(userId, boardData);

  return c.json({ success: true, message: 'Last board updated successfully', data: response });
};

export const listBoard = async (c: Context) => {
  const boardId = c.req.param('boardId');
  const { userId } = c.get('user');
  const response = await Service.listBoard(boardId, userId);

  return c.json({ success: true, message: 'Success!', data: response ?? 'undefined' });
};
