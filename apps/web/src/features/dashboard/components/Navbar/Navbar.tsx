import styles from './Navbar.module.scss';
import logo from '@/assets/logo-mobile.svg';
import chevronDown from '@/assets/icon-chevron-down.svg';
import addIcon from '@/assets/icon-add-task-mobile.svg';
import verticalEllipsis from '@/assets/icon-vertical-ellipsis.svg';
import clsx from 'clsx';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navWrapper}>
        <div className={clsx(styles.container, styles.leftContainer)}>
          <img src={logo} alt="logo" />
          <h1 className={styles.title}>Platform Launch</h1>
          <img src={chevronDown} alt="chevron" />
        </div>
        <div className={clsx(styles.container, styles.rightContainer)}>
          <button>
            <img src={addIcon} alt="icon" />
          </button>
          <button>
            <img src={verticalEllipsis} alt="icon" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
