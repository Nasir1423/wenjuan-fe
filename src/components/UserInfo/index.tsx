import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { getToken, removeToken } from '@/utils/userTokenStorage';
import { useRequest } from 'ahooks';
import { getUserInfoService } from '@/service/user';
import { LOGIN_PATHNAME } from '@/router';
import { UserOutlined } from '@ant-design/icons';

const UserInfo: FC = () => {
  const [isLogin, setIsLogin] = useState(Boolean(getToken()));
  const navigate = useNavigate();
  const { data, run: fetchUserInfo } = useRequest(getUserInfoService, { manual: true });

  useEffect(() => {
    if (isLogin) {
      fetchUserInfo();
    }
  }, [isLogin, fetchUserInfo]);

  const handleLogout = () => {
    removeToken();
    setIsLogin(false);
    navigate(LOGIN_PATHNAME);
  };

  const { nickname } = data || {};

  return (
    <>
      {isLogin ? (
        <div style={{ color: '#e8e8e8' }}>
          <span>
            <UserOutlined />
            &nbsp;{nickname}
          </span>
          <Button type="link" onClick={handleLogout}>
            登出
          </Button>
        </div>
      ) : (
        <Link to={LOGIN_PATHNAME}>登录</Link>
      )}
    </>
  );
};

export default UserInfo;
