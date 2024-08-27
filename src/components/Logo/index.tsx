import { FC, useEffect, useState } from 'react';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { HOME_PATHNAME, MANAGE_LIST_PATHNAME } from '@/router';

const { Title } = Typography;

const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // const token = getToken();
    // setIsLogin(Boolean(username && token));
    setIsLogin(Boolean(username));
  }, [username]);

  const pathname = isLogin ? MANAGE_LIST_PATHNAME : HOME_PATHNAME;

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title /* className={styles.title} */>问卷星</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
