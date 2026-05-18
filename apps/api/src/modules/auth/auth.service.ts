import * as Model from './auth.model.js';
import { registerSchema } from './auth.schema.js';
import { AppError } from '@/shared/errors/app.error.js';
import bcrypt from 'bcryptjs';
import type { NewUser } from './auth.types';
import { sign } from 'hono/jwt';
import { env } from '@/shared/config/env.js';

export const register = async (newUser: NewUser) => {
  const { name, email, password } = newUser;
  const result = registerSchema.safeParse(newUser);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    throw new AppError('Invalid Credentials', 400, errors);
  }
  const existingUser = await Model.findUserEmail(newUser.email);

  if (existingUser === undefined) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Model.register({ name, email, password: hashedPassword });

    if (user !== undefined) {
      const token = await sign(
        {
          userId: user.id,
          email: user.email,
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

  if (existingUser !== undefined) {
    throw new AppError('User already exists', 409, null);
  }
};
