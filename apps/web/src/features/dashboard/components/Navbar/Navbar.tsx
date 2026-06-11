import styles from './Navbar.module.scss';
import logo from '@/assets/logo-mobile.svg';
import chevronDown from '@/assets/icon-chevron-down.svg';
import chevronUp from '@/assets/icon-chevron-up.svg';
import addIcon from '@/assets/icon-add-task-mobile.svg';
import verticalEllipsis from '@/assets/icon-vertical-ellipsis.svg';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useListBoards } from '@dashboard/api';
import { LayoutList } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

type BoardNameProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const BoardName = ({ children, onClick }: BoardNameProps) => {
  return (
    <div onClick={onClick} className={clsx(styles.boardLayout, styles.boardItem)}>
      {children}
    </div>
  );
};

const Navbar = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const { data = [], isLoading } = useListBoards();

  const boards = Array.from(new Map(data.map((b) => [b.name, b])).values());

  const handleClick = (boardId: string) => {
    navigate(`/dashboard/${boardId}`);
    setIsOpen(false);
  };

  const boardName = data.find((board) => board.id === boardId);

  return isLoading ? (
    <small>Loading...</small>
  ) : (
    <nav className={styles.nav}>
      <div className={styles.navWrapper}>
        <div className={clsx(styles.container, styles.leftContainer)}>
          <img src={logo} alt="logo" />
          <h1 className={styles.title}>
            {boardName?.name || (
              <span className={styles.emptyBoardTitle}>Active board appears here</span>
            )}
          </h1>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <img src={chevronUp} alt="chevron" />
            ) : (
              <img src={chevronDown} alt="chevron" />
            )}
          </button>
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
      <div className={clsx(styles.dropdown, isOpen && styles.active)}>
        <div className={styles.dropdownInner}>
          <p className={clsx(styles.boardLayout, styles.title)}>ALL BOARDS ({boards.length})</p>
          {boards.map((board) => (
            <BoardName onClick={() => handleClick(board.id)}>
              <LayoutList color="#697589" size={24} strokeWidth={1.5} />
              <p>{board.name}</p>
            </BoardName>
          ))}
          <BoardName>
            <LayoutList color="#635fc7" size={24} strokeWidth={1.5} />
            <p className={styles.createBoard}>+ Create New Board</p>
          </BoardName>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
