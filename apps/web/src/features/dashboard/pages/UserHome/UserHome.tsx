import { Button } from '../../components';
import { useLogout } from '@/features/auth/hooks';

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
