import type { AuthUser } from '@/types/auth.types.ts';

declare module 'hono' {
  interface ContextVariableMap {
    user: AuthUser;
  }
}
