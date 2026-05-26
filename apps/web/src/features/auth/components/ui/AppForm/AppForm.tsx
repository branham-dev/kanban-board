import styles from './AppForm.module.scss';

type AppFormProps = {
  children: React.ReactNode;
  onSubmit: React.SubmitEventHandler<HTMLFormElement>;
};

const AppForm = ({ children, onSubmit }: AppFormProps) => {
  return (
    <form onSubmit={onSubmit} className={styles.appForm} autoComplete="off">
      <div className={styles.formContainer}>{children}</div>
    </form>
  );
};

export default AppForm;
