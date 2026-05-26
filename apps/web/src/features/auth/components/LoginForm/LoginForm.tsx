import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@kanban/shared';
import { AppForm, InputWrapper, Label } from '@auth/components/ui';

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const initialValues: Inputs = {
    email: '',
    password: '',
  };

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

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
