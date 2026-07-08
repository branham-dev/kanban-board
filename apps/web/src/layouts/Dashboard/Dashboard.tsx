import styles from './Dashboard.module.scss';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Button, Navbar } from '@/features/dashboard/components';
import { useListBoards } from '@/features/dashboard/api';
import { useAppSelector } from '@/store/hooks';
import type { RootState } from '@/store/appStore';
import type { AuthUser } from '@/features/auth/types';
import { useLogout } from '@/features/auth/hooks';
import { useHydrate } from '@/features/auth/service';

const Dashboard = () => {
  const authUser: AuthUser | null = useAppSelector((state: RootState) => state.auth.user);
  const { boardId } = useParams();
  const logout = useLogout();

  const { isLoading: userLoading } = useHydrate();
  const { data: boards = [], isLoading: boardsLoading } = useListBoards();

  if (userLoading || boardsLoading) {
    return null;
  }

  if (!boardId && boards.length > 0) {
    const lastBoard = boards.find((board) => board.id === authUser?.lastBoardId);

    const targetBoard = lastBoard?.id;

    return <Navigate to={`/dashboard/${targetBoard}`} replace />;
  }

  return (
    <div className={styles.dashboard}>
      <Navbar />
      <div className={styles.outletWrapper}>
        {boardId === undefined ? (
          <main>
            <h1>Welcome, {authUser?.name || 'User'}!</h1>
            <Button onClick={logout}>Logout</Button>
          </main>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
