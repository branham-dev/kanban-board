import type { RootState } from '@/app/store/appStore';
import { useAppSelector } from '@/app/store/hooks';
import { Navigate, Outlet } from 'react-router-dom';

const RouteGuard = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthChecked);

  if (isAuthenticated === false) {
    return null;
  }

  if (user === null) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet />;
  }
};

export default RouteGuard;
