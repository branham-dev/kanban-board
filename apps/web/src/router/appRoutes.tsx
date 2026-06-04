import type { RouteObject } from 'react-router-dom';
import { AuthFlow } from '@/features/auth/pages';
import Dashboard from '@/layouts/Dashboard/Dashboard';
import RouteGuard from './RouteGuard';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AuthFlow />,
  },
  {
    element: <RouteGuard />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [],
      },
    ],
  },
];
