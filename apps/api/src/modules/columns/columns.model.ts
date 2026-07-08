import { db } from '@/database/connection';
import { camelize } from '@/shared/utils/camelize';
import type { NewColumn } from '@kanban/shared';
import type { BoardData } from '../boards/boards.types';

export const validateBoardOwner = async (boardId: string): Promise<BoardData | undefined> => {
  // console.log(userId);
  const queryString = `
        SELECT * FROM boards
        WHERE id = $1
    `;
  const raw = await db.query(queryString, [boardId]);
  const response = camelize(raw.rows[0]);
  // console.log(response);
  return response;
};

export const addColumn = async (payload: NewColumn) => {
  const queryString = `
        INSERT INTO columns (board_id, name, position)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
  const values = [payload.boardId, payload.name, payload.position];
  const response = await db.query(queryString, values);
  const result = camelize(response.rows[0]);
  console.log(result);
  return;
};
