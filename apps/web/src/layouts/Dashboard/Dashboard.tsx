import styles from './Dashboard.module.scss';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Button, Navbar } from '@/features/dashboard/components';
import { useListBoards } from '@/features/dashboard/api';
import { useAppSelector } from '@/store/hooks';
import type { RootState } from '@/store/appStore';
import type { AuthUser } from '@/features/auth/types';
import { useLogout } from '@dashboard/hooks';

const Dashboard = () => {
  const user: AuthUser | null = useAppSelector((state: RootState) => state.auth.user);
  const { boardId } = useParams();
  const logout = useLogout();

  const { data = [], isLoading } = useListBoards();

  if (!isLoading && data.length > 0 && !boardId) {
    return <Navigate to={`/dashboard/${data[0]?.id}`} replace />;
  }

  return (
    <div className={styles.dashboard}>
      <Navbar />
      <div className={styles.outletWrapper}>
        {boardId === undefined ? (
          <main>
            <h1>Welcome, {user?.name || 'User'}!</h1>
            <Button clickAction={logout}>Logout</Button>
          </main>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
