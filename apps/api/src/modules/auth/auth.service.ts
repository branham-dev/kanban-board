import * as Model from './auth.model.js';
import { AppError } from '@/shared/errors/app.error.js';
import bcrypt from 'bcryptjs';
import type { LoginCredentials, NewUser } from './auth.types';
import { sign } from 'hono/jwt';
import { env } from '@/shared/config/env.js';
import { z } from 'zod';
import { flattenError } from './utils/flatten.js';
import { registerSchema, loginSchema } from '@kanban/shared';

export const register = async (newUser: NewUser) => {
  const validated = registerSchema.safeParse(newUser);
  const { name, email, password } = newUser;

  if (!validated.success) {
    const raw = z.treeifyError(validated.error);
    const errors = flattenError(raw);

    throw new AppError('Invalid Credentials', 400, errors);
  }
  const existingUser = await Model.findUserEmail(newUser.email);

  if (existingUser !== undefined) {
    throw new AppError('This email already exists', 409, null);
  }
  if (existingUser === undefined) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Model.register({ name, email, password: hashedPassword });

    if (user !== undefined) {
      const token = await sign(
        {
          userId: user.id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        },
        env.JWT_SECRET,
      );

      return {
        user: user,
        token,
      };
    }
  }
};

export const login = async (loginData: LoginCredentials) => {
  const validated = loginSchema.safeParse(loginData);

  if (!validated.success) {
    const raw = z.treeifyError(validated.error);
    const errors = flattenError(raw);

    throw new AppError('Invalid credentials', 400, errors);
  }
  const { email, password } = loginData;

  const loginResponse = await Model.findUserEmail(email);

  if (loginResponse === undefined) {
    throw new AppError('Incorrect email or password', 409, null);
  }

  if (loginResponse !== undefined && loginResponse.email === email) {
    const isPasswordValid = await bcrypt.compare(password, loginResponse.password);

    if (isPasswordValid === false) {
      throw new AppError('Incorrect email or password', 409, null);
    } else if (isPasswordValid === true) {
      const safeUser = {
        id: loginResponse.id,
        name: loginResponse.name,
        email: loginResponse.email,
      };

      const token = await sign(
        {
          userId: safeUser.id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        },
        env.JWT_SECRET,
      );
      return {
        user: safeUser,
        token,
      };
    }
  }
};

export const current = async (userId: string) => {
  // try {
  const user = await Model.current(userId);

  return user;
  // } catch (error: unknown) {
  // throw classifyError(error);
  // }
};
