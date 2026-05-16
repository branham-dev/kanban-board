import type { JwtPayload, AuthUser } from '@/types/auth.types.js';
import { JwtPayloadSchema } from '@/schema/auth.schema.js';
import type { Context, Next } from 'hono';
import { verify } from 'hono/jwt';
import { env } from '@/config/env.js';

export const authenticate = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    return c.json({ error: 'Unauthorized: missing token' }, 401);
  }
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return c.json({ error: 'Unauthorized: invalid token format' }, 401);
  }
  const token = parts[1];

  if (!token) {
    return c.json({ error: 'Unauthorized: missing token' }, 401);
  }

  try {
    const raw: unknown = await verify(token, env.AUTHSECRET, 'HS256');
    const payload: JwtPayload = JwtPayloadSchema.parse(raw);

    const user: AuthUser = {
      userId: payload.userId,
      email: payload.email,
    };

    c.set('user', user);
    await next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.json({ error: 'Unauthorized: invalid or expired token' }, 401);
  }
};
