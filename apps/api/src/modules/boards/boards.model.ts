import { db } from '@/database/connection';
import { camelize } from '@/shared/utils/camelize';

export const listAllBoards = async (userId: string) => {
  try {
    const string = `
            SELECT * 
            FROM boards
            WHERE user_id = $1
        `;
    const value = [userId];
    const result = await db.query(string, value);
    // console.log(result.rows);
    return camelize(result.rows);
  } catch (error) {
    throw error;
  }
};

export const createBoard = async (userId: string, boardName: string, position: number) => {
  try {
    const string = `
            INSERT INTO boards (user_id, name, position)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
    const values = [userId, boardName, position];
    const result = await db.query(string, values);
    // console.log('Database: ', result.rows);
    return camelize(result.rows[0]);
  } catch (error) {
    throw error;
  }
};

export const UpdateBoard = async (userId: string, boardName: string, position: number) => {
  try {
    const string = `
            UPDATE boards
            SET name = $1
                position = $2
            WHERE id = $3 AND user_id = $4
            RETURNING *;
        `;
    const values = [userId, boardName, position];
    const result = await db.query(string, values);
    console.log('Database: ', result.rows);
  } catch (error) {
    console.log(error);
  }
};
