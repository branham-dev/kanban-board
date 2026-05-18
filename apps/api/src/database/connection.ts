import { Pool } from 'pg';
import { env } from '@/shared/config/env.js';

export const db = new Pool({
  connectionString: env.DATABASE_URL,
});
