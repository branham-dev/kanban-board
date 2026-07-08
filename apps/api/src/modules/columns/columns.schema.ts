import z from 'zod';

export const newColumnSchema = z.object({
  name: z.string('Invalid column name.').min(1, 'Column name is requied'),
  boardId: z.uuid(),
  position: z
    .number()
    .int('Column position must be an integer')
    .nonnegative('Column position must be 0 or greater'),
});
