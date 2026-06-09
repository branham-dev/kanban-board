import { Hono } from 'hono';
import authRoute from '@/modules/auth/auth.routes.js';
import { cors } from 'hono/cors';
import { boardRoute } from '@/modules/boards/boards.routes';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: ['http://localhost:5174', 'https://kanban.branhamkaranja.com'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/auth', authRoute);
app.route('/', boardRoute);

export default app;
