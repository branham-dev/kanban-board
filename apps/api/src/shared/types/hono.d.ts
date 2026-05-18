import type { AuthUser } from '@/shared/types/auth.types';

declare module 'hono' {
  interface ContextVariableMap {
    user: AuthUser;
  }
}
