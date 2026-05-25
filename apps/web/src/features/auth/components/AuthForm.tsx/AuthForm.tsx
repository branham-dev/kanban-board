import type React from 'react';
import styles from './AuthForm.module.scss';
import { useForm, type SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const InputWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.inputWrapper}>{children}</div>;
};

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formContainer}>
        <InputWrapper>
          <label htmlFor="name">Full Name</label>
          <input id="name" type="text" {...register('name')} />
          {errors.name && <small>{errors.name.message}</small>}
        </InputWrapper>

        <InputWrapper>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <small>{errors.email.message}</small>}
        </InputWrapper>

        <InputWrapper>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register('password')} />
          {errors.email && <small>{errors.email.message}</small>}
        </InputWrapper>

        <InputWrapper>
          <label htmlFor="confirm">Confirm Password</label>
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
      </div>
    </form>
  );
};

export default AuthForm;
