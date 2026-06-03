import { z } from 'zod';

export const JwtPayloadSchema = z.object({
  userId: z.string(),
});
