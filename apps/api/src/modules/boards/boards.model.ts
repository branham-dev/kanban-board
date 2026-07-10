import { db } from '@/database/connection';
import { camelize } from '@/shared/utils/camelize';
import type { BoardData, ColumnData, Subtask, Task } from './boards.types';

export const getLastPosition = async (userId: string) => {
  const queryString = `
    SELECT MAX(position) AS last_position
    FROM boards
    WHERE user_id = $1
  `;
  const raw = await db.query(queryString, [userId]);
  const result = camelize(raw.rows[0]);
  return result.lastPosition;
};

export const listAllBoards = async (userId: string) => {
  const string = `
            SELECT * 
            FROM boards
            WHERE user_id = $1
        `;
  const value = [userId];
  const result = await db.query(string, value);

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

  return camelize(result.rows[0]);
};

export const findBoard = async (boardId: string): Promise<BoardData | undefined> => {
  const queryString = `
    SELECT id, name, user_id
    FROM boards
    WHERE id = $1
  `;
  const response = await db.query(queryString, [boardId]);
  const resultData = camelize(response.rows[0]);

  return resultData as BoardData;
};

export const updateLastBoard = async (userId: string, boardId: string): Promise<void> => {
  const queryString = `
    UPDATE user_preferences
    SET last_board_id = $1,
        updated_at = NOW()
    WHERE user_id = $2
  `;
  await db.query(queryString, [boardId, userId]);
};

export const listBoard = async (boardId: string): Promise<BoardData | undefined> => {
  const queryString = `
    SELECT id, user_id, name
    FROM boards
    WHERE id = $1
  `;
  const response = await db.query(queryString, [boardId]);
  const result = camelize(response.rows[0]);

  return result as BoardData;
};

export const listColumns = async (boardId: string): Promise<ColumnData[]> => {
  const queryString = `
    SELECT id, board_id, name, position
    FROM columns
    WHERE board_id = $1
    ORDER BY position
  `;
  const response = await db.query(queryString, [boardId]);
  const result = camelize<ColumnData[]>(response.rows);

  return result;
};

export const listTasks = async (columnsId: Array<string>): Promise<Task[]> => {
  if (columnsId.length === 0) {
    return [];
  }
  const queryString = `
    SELECT id, column_id, title, description, position
    FROM tasks
    WHERE column_id = ANY($1::uuid[])
    ORDER BY position
  `;
  const response = await db.query(queryString, [columnsId]);
  const result = camelize<Task[]>(response.rows);

  return result;
};

export const listSubtasks = async (taskIds: string[]): Promise<Subtask[]> => {
  if (taskIds.length === 0) {
    return [];
  }
  const queryString = `
    SELECT id, task_id, title, is_completed
    FROM subtasks
    WHERE task_id = ANY($1::uuid[])
  `;
  const response = await db.query(queryString, [taskIds]);
  const result = camelize<Subtask[]>(response.rows);

  return result;
};
