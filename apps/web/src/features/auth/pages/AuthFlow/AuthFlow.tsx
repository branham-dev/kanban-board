import React, { useState } from 'react';
import styles from './AuthFlow.module.scss';
import clsx from 'clsx';

type AuthButtons = Array<{
  text: string;
  isActive: boolean;
  name: string;
}>;

const AuthFlow = () => {
  const [authState, setAuthState] = useState({
    register: true,
    login: false,
  });

  const isRegister = authState.register;
  const isLogin = authState.login;

  const authButtons: AuthButtons = [
    { text: 'Sign Up', isActive: isRegister, name: 'register' },
    { text: 'Sign In', isActive: isLogin, name: 'login' },
  ];

  const handleAuthClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.name;
    setAuthState({ register: false, login: false, [key]: true });
  };

  const activeButton = authButtons.find((button) => button.isActive);
  if (!activeButton) {
    throw new Error('No active auth button found');
  }
  const h1Key = activeButton.name;

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
              return (
                <button
                  key={button.text}
                  name={button.name}
                  className={clsx(button.isActive && styles.active)}
                  onClick={handleAuthClick}
                >
                  {button.text}
                </button>
              );
            })}
          </div>
        </section>
        <section>
          <form action="">
            <label htmlFor=""></label>
          </form>
        </section>
      </div>
    </main>
  );
};

export default AuthFlow;
