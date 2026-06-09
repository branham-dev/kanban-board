import { Outlet } from 'react-router-dom';
import styles from './Dashboard.module.scss';
import { Navbar } from '@/features/dashboard/components';

const DashboardLayout = () => {
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
