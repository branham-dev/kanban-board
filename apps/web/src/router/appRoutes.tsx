import type { RouteObject } from 'react-router-dom';
import { AuthFlow } from '@/features/auth/pages';
import Dashboard from '@/layouts/Dashboard/Dashboard';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AuthFlow />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
];
