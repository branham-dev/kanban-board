import styles from './Dashboard.module.scss';
import { useAppSelector } from '@/store/hooks';
import type { RootState } from '@/store/appStore';
import type { AuthUser } from '@/features/auth/types';

const Dashboard = () => {
  const user: AuthUser | null = useAppSelector((state: RootState) => state.auth.user);

  console.log(user);

  return (
    <main className={styles.dashboard}>
      <h1>Welcome, {user?.name || 'User'}!</h1>
    </main>
  );
};

export default Dashboard;
