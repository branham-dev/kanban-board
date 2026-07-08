import clsx from 'clsx';
import styles from './Button.module.scss';

// type ButtonProps = {
//   clickAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
//   children: React.ReactNode;
//   className?: string | undefined;
// };

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
