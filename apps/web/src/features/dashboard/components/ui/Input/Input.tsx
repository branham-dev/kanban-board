import clsx from 'clsx';
import styles from './Input.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error: string | undefined;
  labelClass?: string | undefined;
};

const Input = ({ label, error, id, labelClass, ...props }: InputProps) => {
  return (
    <label htmlFor={id} className={clsx(styles.label, labelClass)}>
      {label && <span>{label}</span>}
      <input id={id} {...props} />
      {error && <small>{error}</small>}
    </label>
  );
};

export default Input;
