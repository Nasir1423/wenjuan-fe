import { FC } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './index.module.scss';

const ManageLayout: FC = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.left}>
        <p>#ManageLayout nav</p>
        <button>创建问卷</button>
        <br />
        <Link to="list">我的问卷</Link>
        <br />
        <Link to="star">星标问卷</Link>
        <br />
        <Link to="trash">回收站</Link>
      </nav>
      <main className={styles.right}>
        <Outlet />
      </main>
    </div>
  );
};

export default ManageLayout;
