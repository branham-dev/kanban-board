import type { RootState } from '@/app/store/appStore';
import { useAppSelector } from '@/app/store/hooks';
import { useHydrate } from '@auth/service';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  const { isLoading } = useHydrate();

  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthChecked);

  if (isLoading && isAuthenticated === false) {
    return null;
  }

  return <Outlet />;
};

export default AppLayout;
