import styles from './Label.module.scss';

type LabelProps = {
  htmlFor: string;
  children: string;
};

const Label = ({ htmlFor, children }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {children}
    </label>
  );
};

export default Label;
