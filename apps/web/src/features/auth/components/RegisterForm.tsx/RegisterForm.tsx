import styles from './RegisterForm.module.scss';
import { useForm, type SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import { registerSchema } from '@kanban/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppForm, InputWrapper, Label } from '@auth/components/ui';
import { useRegister } from '@auth/service';
import { toast } from 'sonner';
import { narrowError } from '@/utils';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const [registerUser, { isLoading, error }] = useRegister();

  const initialValues: Inputs = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: initialValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      const response = await registerUser(data).unwrap();
      toast.success(response.message);
    } catch (error: unknown) {
      toast.error(narrowError(error));
    }
  };

  const password = watch('password');

  return (
    <AppForm onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <Label htmlFor="name">Full Name</Label>
        <input id="name" type="text" {...register('name')} />
        {errors.name && <small>{errors.name.message}</small>}
      </InputWrapper>

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

      <InputWrapper>
        <Label htmlFor="confirm">Confirm Password</Label>
        <input
          id="confirm"
          type="password"
          {...register('confirmPassword', {
            validate: (value) => value === password || 'Passwords do not match',
          })}
          className={clsx(errors.confirmPassword && styles.error)}
        />
        {errors.confirmPassword && <small>{errors.confirmPassword.message}</small>}
      </InputWrapper>

      <button type="submit">Submit</button>
    </AppForm>
  );
};

export default RegisterForm;
