import { Navigate, Outlet, useLocation } from 'react-router-dom';
import styles from './Dashboard.module.scss';
import { Navbar } from '@/features/dashboard/components';
import { useListBoards } from '@/features/dashboard/api';

const DashboardLayout = () => {
  const { data = [], isLoading } = useListBoards();
  const location = useLocation();

  if (!isLoading && data.length > 0 && location.pathname === '/dashboard') {
    return <Navigate to={`/dashboard/${data[0]?.id}`} replace />;
  }

  return (
    <div className={styles.dashboard}>
      <Navbar />
      <div className={styles.outletWrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
