import type { RouteObject } from 'react-router-dom';
import { AuthFlow } from '@/features/auth/pages';
import Dashboard from '@/layouts/DashboardLayout/Dashboard';
import RouteGuard from './RouteGuard';
import AppLayout from '@/layouts/AppLayout/AppLayout';
import { UserHome } from '@/features/dashboard/pages';

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
            children: [
              {
                path: ':boardId',
                element: <UserHome />,
              },
            ],
          },
        ],
      },
    ],
  },
];
