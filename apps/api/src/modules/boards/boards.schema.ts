import { z } from 'zod';

export const createBoardSchema = z.object({
  name: z.string('Invalid name').min(1, 'Board name is required'),
  position: z.number().int('Must be an integer').nonnegative('Must be 0 or greater'),
});
