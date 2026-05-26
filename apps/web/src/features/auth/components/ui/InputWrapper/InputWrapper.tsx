import styles from './InputWrapper.module.scss';

const InputWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.inputWrapper}>{children}</div>;
};

export default InputWrapper;
