import { Hono } from 'hono';
import * as Controller from './boards.controller';
import { authenticate } from '../auth/middleware/auth.middleware';

export const boardRoute = new Hono();

boardRoute.get('boards/all', authenticate, Controller.listAllBoards);
boardRoute.post('board/create', authenticate, Controller.createBoard);

boardRoute.patch('users/preferences/last-board', authenticate, Controller.updateLastBoard);
