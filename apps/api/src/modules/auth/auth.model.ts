import { db } from '@/database/connection';
import type { User, NewUser } from './auth.types';
import { camelize } from '@/shared/utils/camelize';

export const findUserEmail = async (email: string): Promise<User | undefined> => {
  try {
    const result = await db.query(
      `
            SELECT id, email, password_hash
            FROM users
            WHERE email = $1
            LIMIT 1
        `,
      [email],
    );
    return camelize(result.rows[0], true);
  } catch (error) {
    console.error('FindUserEmail Model Error:', error);
    return undefined;
  }
};

export const register = async (newUser: NewUser): Promise<User | undefined> => {
  const { name, email, password } = newUser;
  try {
    const query = `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
    `;
    const values = [name, email, password];
    const result = await db.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error('Register Model Error:', error);
    return undefined;
  }
};
