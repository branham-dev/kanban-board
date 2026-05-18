import { db } from '@/database/connection';
import type { User, NewUser } from './auth.types';

// ~ Hello

export const findUserEmail = async (email: string): Promise<User | undefined> => {
  try {
    const result = await db.query(
      `
            SELECT id, name, email
            FROM users
            WHERE email = $1
            LIMIT 1
        `,
      [email],
    );
    return result.rows[0];
  } catch (error) {
    console.error('FindUserEmail Model Error:', error);
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
  }
};
