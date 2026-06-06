import type { RouteObject } from 'react-router-dom';
import { AuthFlow } from '@/features/auth/pages';
import Dashboard from '@/layouts/Dashboard/Dashboard';
import RouteGuard from './RouteGuard';
import AppLayout from '@/layouts/AppLayout/AppLayout';

export const appRoutes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
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
    ],
  },
];
