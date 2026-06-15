import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonProps = {
  clickAction?: () => void;
  children: React.ReactNode;
  className?: string | undefined;
};

const Button = ({ children, clickAction, className }: ButtonProps) => {
  return (
    <button onClick={clickAction} className={clsx(styles.button, className)}>
      {children}
    </button>
  );
};

export default Button;
