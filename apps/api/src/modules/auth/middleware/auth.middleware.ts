import type { JwtPayload, AuthUser } from '@/shared/types/auth.types.js';
import { JwtPayloadSchema } from '@/shared/schema/auth.schema.js';
import type { Context, Next } from 'hono';
import { verify } from 'hono/jwt';
import { env } from '@/shared/config/env.js';
import { getCookie } from 'hono/cookie';

export const authenticate = async (c: Context, next: Next) => {
  const token = getCookie(c, 'accessToken');

  if (!token) {
    return c.json({ error: 'Unauthorized: missing token' }, 401);
  }

  try {
    const raw: unknown = await verify(token, env.JWT_SECRET, 'HS256');
    const payload: JwtPayload = JwtPayloadSchema.parse(raw);

    const user: AuthUser = {
      userId: payload.userId,
    };

    c.set('user', user);
    await next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.json('Unauthorized: invalid or expired token', 401);
  }
};
