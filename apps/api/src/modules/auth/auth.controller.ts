import type { Context } from 'hono';
import * as Service from './auth.service';
import { AppError } from '@/shared/errors/app.error.js';

export const register = async (c: Context) => {
  try {
    const newUser = await c.req.json();
    const response = await Service.register(newUser);

    return c.json({ success: true, message: 'Account created successfully', data: response }, 200);
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
    }
  }
};

export const login = async (c: Context) => {
  try {
    const existingUser = await c.req.json();
    console.log(existingUser);
  } catch (error) {
    console.log(error);
  }
};

export const current = async (c: Context) => {
  try {
    const currentUser = await c.req.json();
    console.log(currentUser);
  } catch (error) {
    console.log(error);
  }
};
