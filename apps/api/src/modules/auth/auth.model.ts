import { db } from '@/database/connection';
import type { User, NewUser } from './auth.types';
import { camelize } from '@/shared/utils/camelize';

export const findUserEmail = async (email: string): Promise<User | undefined> => {
  const result = await db.query(
    `
            SELECT id, name, email, password_hash
            FROM users
            WHERE email = $1
            LIMIT 1
        `,
    [email],
  );
  const response = camelize(result.rows[0], true);
  if (!response) return undefined;

  return response as User;
};

export const register = async (newUser: NewUser): Promise<User | undefined> => {
  const { name, email, password } = newUser;
  const query = `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
    `;
  const values = [name, email, password];
  const result = await db.query(query, values);

  return result.rows[0];
};

export const current = async (userId: string) => {
  const query = `
      SELECT name, email
      FROM users
      WHERE id = $1
    `;
  const value = [userId];
  const result = await db.query(query, value);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};
