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
  const client = await db.connect();

  try {
    await client.query('BEGIN');
    const userResult = await client.query(
      `
          INSERT INTO users (name, email, password_hash)
          VALUES ($1, $2, $3)
          RETURNING id, name, email
        `,
      [name, email, password],
    );

    const user = userResult.rows[0];
    console.log('Creation: ', user);

    await client.query(
      `
          INSERT INTO user_preferences (user_id)
          VALUES ($1)
        `,
      [user.id],
    );

    await client.query('COMMIT');

    console.log('Preferences: ', user);
    return user;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
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
