import styles from './ViewContainer.module.scss';

type ViewContainerProps = {
  children: React.ReactNode;
};

const ViewContainer = ({ children }: ViewContainerProps) => {
  return <div className={styles.viewContainer}>{children}</div>;
};

export default ViewContainer;
