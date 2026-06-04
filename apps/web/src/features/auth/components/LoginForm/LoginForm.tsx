import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@kanban/shared';
import { AppForm, InputWrapper, Label } from '@auth/components/ui';
import { useLogin } from '@auth/service';
import { toast } from 'sonner';
import { narrowError } from '@/utils';
import { setUser } from '@authSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';

type Inputs = {
  email: string;
  password: string;
};

const initialValues: Inputs = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [loginUser] = useLogin();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: initialValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async (userData: Inputs) => {
    try {
      const { data, message } = await loginUser(userData).unwrap();

      dispatch(setUser(data));

      toast.success(message);

      navigate('/dashboard', { replace: true });
    } catch (error: unknown) {
      const message = narrowError(error);
      toast.error(message);
    }
  };

  return (
    <AppForm onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <Label htmlFor="email">Email</Label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <small>{errors.email.message}</small>}
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="password">Password</Label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <small>{errors.password.message}</small>}
      </InputWrapper>

      <button type="submit">Submit</button>
    </AppForm>
  );
};

export default LoginForm;
