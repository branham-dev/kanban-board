import { Hono } from 'hono';
import authRoute from '@/modules/auth/auth.routes.js';
import { cors } from 'hono/cors';
import { boardRoute } from '@/modules/boards/boards.routes';
import { AppError } from './shared/errors/app.error';
import { classifyError } from './shared/errors/classifyError';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: ['http://localhost:5174', 'https://kanban.branhamkaranja.com'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/auth', authRoute);
app.route('/', boardRoute);

app.onError((error, c) => {
  console.log(error);

  if (error instanceof AppError) {
    return c.json(
      {
        success: false,
        message: error.message,
        errors: error.errors,
      },
      error.statusCode,
    );
  }

  const classifed = classifyError(error);

  return c.json(
    {
      success: false,
      message: classifed.message,
      errors: classifed.errors,
    },
    classifed.statusCode,
  );
});

export default app;
