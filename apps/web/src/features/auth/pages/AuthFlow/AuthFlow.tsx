import { useState } from 'react';
import styles from './AuthFlow.module.scss';
import clsx from 'clsx';
import { LoginForm, RegisterForm } from '@auth/components';
import type { AuthState } from '@auth/types';

type AuthButtons = Array<{
  text: string;
  name: AuthState;
}>;

const AuthFlow = () => {
  const [authState, setAuthState] = useState<AuthState>('register');

  const isRegister = authState === 'register';
  const isLogin = authState === 'login';

  const authButtons: AuthButtons = [
    { text: 'Sign Up', name: 'register' },
    { text: 'Sign In', name: 'login' },
  ] as const;

  const handleAuthClick = (key: AuthState) => {
    setAuthState(key);
  };

  const h1Key = authState;

  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <h1 key={h1Key} className={styles.title}>
          {isRegister && 'Sign up to start managing your tasks!'}
          {isLogin && 'Login to continue where you left off!'}
        </h1>
        <section className={styles.section}>
          <div className={styles.authToggle}>
            <div className={clsx(styles.toggleSlider, isLogin && styles.active)}></div>
            {authButtons.map((button) => {
              const isActive = authState === button.name;
              return (
                <button
                  key={button.text}
                  name={button.name}
                  className={clsx(isActive && styles.active)}
                  onClick={() => handleAuthClick(button.name)}
                >
                  {button.text}
                </button>
              );
            })}
          </div>
        </section>
        <section>
          {isRegister && <RegisterForm />}
          {isLogin && <LoginForm />}
        </section>
      </div>
    </main>
  );
};

export default AuthFlow;
