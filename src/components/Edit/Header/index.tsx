import { FC } from 'react';
import styles from './index.module.scss';
import { Button, Space, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ToolBar from './ToolBar';

const { Title } = Typography;

const Header: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title style={{ fontSize: '18px', lineHeight: '1', margin: '0' }}>问卷标题</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <ToolBar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button type="primary">保存</Button>
            <Button>发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Header;
