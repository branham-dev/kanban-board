import type { RootState } from '@/store/appStore';
import { useAppSelector } from '@/store/hooks';
import { Navigate, Outlet } from 'react-router-dom';

const RouteGuard = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  if (user === null) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet />;
  }
};

export default RouteGuard;
