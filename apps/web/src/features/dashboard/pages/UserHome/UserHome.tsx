import styles from './UserHome.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { RootState } from '@/store/appStore';
import type { AuthUser } from '@/features/auth/types';
import { useLogout } from '@auth/service';
import { narrowError } from '@/utils';
import { toast } from 'sonner';
import { clearUser } from '@authSlice';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const user: AuthUser | null = useAppSelector((state: RootState) => state.auth.user);

  console.log(user);

  const [logout] = useLogout();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      dispatch(clearUser());
      toast.success(response.message);
      navigate('/', { replace: true });
    } catch (error) {
      const message = narrowError(error);
      toast.error(message);
    }
  };

  return <main></main>;
};

export default UserHome;

{
  /* <main className={styles.dashboard}>
      <h1>Welcome, {user?.name || 'User'}!</h1>
      <button onClick={handleLogout} className={styles.button}>
        Logout
      </button>
    </main> */
}
