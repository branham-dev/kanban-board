import { Button } from '../../components';
import { useLogout } from '@dashboard/hooks';

const UserHome = () => {
  const logout = useLogout();

  return (
    <div>
      <p>User Home</p>
      <Button clickAction={logout}>Logout</Button>
    </div>
  );
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
