import type { Context } from 'hono';
import * as Service from './auth.service';
import { setCookie } from 'hono/cookie';

export const register = async (c: Context) => {
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
};

export const login = async (c: Context) => {
  const payload = await c.req.json();
  const response = await Service.login(payload);

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

  return c.json({ success: true, message: 'Logged in successfully', data: response.user }, 200);
};

export const current = async (c: Context) => {
  const authUser = c.get('user');
  const response = await Service.current(authUser.userId);

  return c.json({ success: true, message: 'Successfully fetched user data', data: response }, 200);
};

export const logout = (c: Context) => {
  setCookie(c, 'accessToken', '', {
    httpOnly: true,
    maxAge: 0,
  });

  return c.json({ success: true, message: 'Logged out successfully' }, 200);
};
