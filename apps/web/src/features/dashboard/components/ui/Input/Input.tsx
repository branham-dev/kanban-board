import styles from './Input.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error: string | undefined;
};

const Input = ({ label, error, id, ...props }: InputProps) => {
  return (
    <label htmlFor={id} className={styles.label}>
      <span>{label}</span>
      <input id={id} {...props} />
      {error && <small>{error}</small>}
    </label>
  );
};

export default Input;
