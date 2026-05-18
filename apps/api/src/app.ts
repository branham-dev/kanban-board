import { Hono } from 'hono';
import authRoute from '@/modules/auth/auth.routes.js';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/auth', authRoute);

export default app;
