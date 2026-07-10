import { z } from 'zod';

const columnSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Column name must be at least 2 characters long.')
    .max(30, 'Column name cannot exceed 30 characters.'),
});

export const createBoardSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Board name must be at least 2 characters long.')
    .max(50, 'Board name cannot exceed 50 characters.'),
  columns: z.array(columnSchema).default([]),
});

export const boardIdSchema = z.object({
  boardId: z.uuid(),
});
