import { FC } from 'react';
import styles from './index.module.scss';
import { Button, Space } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ToolBar from './ToolBar';
import PageTitle from './PageTitle';
import SaveButton from './SaveButton';
import PublishButton from './PublishButton';

const Header: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <PageTitle />
          </Space>
        </div>
        <div className={styles.main}>
          <ToolBar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Header;
