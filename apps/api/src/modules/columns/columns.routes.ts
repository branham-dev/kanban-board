import { Hono } from 'hono';
import * as Controller from './columns.controller';
import { authenticate } from '../auth/middleware/auth.middleware';

const columnRoutes = new Hono();

columnRoutes.post('/column/add-new', authenticate, Controller.addColumn);
columnRoutes.post('/board/add-column', authenticate, Controller.addColumn);

export default columnRoutes;
