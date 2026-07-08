import { useLogoutMutation } from '@/features/auth/service';
import { clearUser } from '@/features/auth/slice';
import { api } from '@/service/api';
import { useAppDispatch } from '@/app/store/hooks';
import { narrowError } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();

      dispatch(clearUser());
      dispatch(api.util.resetApiState());
      toast.success(response.message);
      navigate('/', { replace: true });
    } catch (error) {
      const message = narrowError(error);
      toast.error(message);
    }
  };
  return handleLogout;
};
