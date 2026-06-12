import styles from './Button.module.scss';

type ButtonProps = {
  clickAction: () => void;
  children: React.ReactNode;
};

const Button = ({ children, clickAction }: ButtonProps) => {
  return (
    <button onClick={clickAction} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
