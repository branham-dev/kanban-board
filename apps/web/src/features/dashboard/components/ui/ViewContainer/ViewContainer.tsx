import styles from './ViewContainer.module.scss';

type ViewContainerProps = {
  children: React.ReactNode;
};

const ViewContainer = ({ children }: ViewContainerProps) => {
  return <article className={styles.viewContainer}>{children}</article>;
};

export default ViewContainer;
