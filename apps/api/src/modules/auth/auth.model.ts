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

    await client.query(
      `
          INSERT INTO user_preferences (user_id)
          VALUES ($1)
        `,
      [user.id],
    );

    await client.query('COMMIT');

    return user;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const current = async (userId: string) => {
  const queryString = `
    SELECT
      u.name,
      u.email,
      up.last_board_id
    FROM users u
    LEFT JOIN user_preferences up
      ON up.user_id = u.id
    WHERE u.id = $1
  `;
  const value = [userId];
  const result = await db.query(queryString, value);
  console.log(camelize(result.rows[0]));

  if (result.rows.length === 0) {
    return null;
  }

  return camelize(result.rows[0]);
};
