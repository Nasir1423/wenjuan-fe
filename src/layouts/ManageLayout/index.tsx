import { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Space, Button, Divider } from 'antd';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <nav className={styles.left}>
        <Space direction="vertical" align="center">
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            新建问卷
          </Button>
          <Divider style={{ border: 'transparent' }}></Divider>
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            onClick={() => nav('/manage/list')}
            icon={<BarsOutlined />}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            onClick={() => nav('/manage/star')}
            icon={<StarOutlined />}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            onClick={() => nav('/manage/trash')}
            icon={<DeleteOutlined />}
          >
            回收站
          </Button>
        </Space>
      </nav>
      <main className={styles.right}>
        <Outlet />
      </main>
    </div>
  );
};

export default ManageLayout;
