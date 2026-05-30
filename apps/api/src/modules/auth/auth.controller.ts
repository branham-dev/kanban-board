import type { Context } from 'hono';
import * as Service from './auth.service';
import { AppError } from '@/shared/errors/app.error.js';
import { setCookie } from 'hono/cookie';

export const register = async (c: Context) => {
  try {
    const newUser = await c.req.json();
    const response = await Service.register(newUser);

    if (response === undefined) {
      throw new Error();
    }

    setCookie(c, 'accessToken', response.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return c.json(
      { success: true, message: 'Account created successfully', data: response.user },
      200,
    );
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
    return c.json({ success: false, message: 'Internal Server Error' }, 500);
  }
};

export const login = async (c: Context) => {
  try {
    const payload = await c.req.json();
    const response = await Service.login(payload);

    if (response === undefined) {
      throw new Error();
    }

    console.log('Response.User @ Controller:', response.user);

    setCookie(c, 'accessToken', response.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return c.json({ success: true, message: 'Logged in successfully', data: response.user }, 200);
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
    return c.json({ success: false, message: 'Internal Server Error' }, 500);
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
