import { FC } from 'react';
import styles from './index.module.scss';
import { Button, Space, Typography } from 'antd';
import useGetPageInfo from '@/hooks/useGetPageInfo';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { QUESTION_EDIT_PATHNAME } from '@/router';
import LinkAndQRCode from './LinkAndQRCode';

const { Title } = Typography;

const Header: FC = () => {
  const { title } = useGetPageInfo();
  const nav = useNavigate();
  const { id = '' } = useParams();

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <LinkAndQRCode />
        </div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`${QUESTION_EDIT_PATHNAME}/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
