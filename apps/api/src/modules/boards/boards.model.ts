import { db } from '@/database/connection';
import { camelize } from '@/shared/utils/camelize';
import type { BoardData, LastBoard } from './boards.types';

export const listAllBoards = async (userId: string) => {
  const string = `
            SELECT * 
            FROM boards
            WHERE user_id = $1
        `;
  const value = [userId];
  const result = await db.query(string, value);
  // console.log(result.rows);
  return camelize(result.rows);
};

export const createBoard = async (userId: string, boardName: string, position: number) => {
  const string = `
            INSERT INTO boards (user_id, name, position)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
  const values = [userId, boardName, position];
  const result = await db.query(string, values);
  // console.log('Database: ', result.rows);
  return camelize(result.rows[0]);
};

export const findBoard = async (boardId: string): Promise<BoardData | undefined> => {
  // console.log("At Find Board Model");
  // return;
  const queryString = `
    SELECT id, name, user_id
    FROM boards
    WHERE id = $1
  `;
  const response = await db.query(queryString, [boardId]);
  const resultData = camelize(response.rows[0]);
  // console.log("Model Database Response: ", resultData);
  return resultData as BoardData;
};

export const updateLastBoard = async (userId: string, boardId: string): Promise<void> => {
  // console.log("At Update Last Board Model");
  const queryString = `
    UPDATE user_preferences
    SET last_board_id = $1,
        updated_at = NOW()
    WHERE user_id = $2
  `;
  await db.query(queryString, [boardId, userId]);
};

// export const UpdateBoard = async (userId: string, boardName: string, position: number) => {

//     const string = `
//             UPDATE boards
//             SET name = $1
//                 position = $2
//             WHERE id = $3 AND user_id = $4
//             RETURNING *;
//         `;
//     const values = [userId, boardName, position];
//     const result = await db.query(string, values);
//     console.log('Database: ', result.rows);
// };
