import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { removeToken } from '@/utils/userTokenStorage';
import { LOGIN_PATHNAME } from '@/router';
import { UserOutlined } from '@ant-design/icons';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { useDispatch } from 'react-redux';
import { logoutReducer } from '@/store/user';

const UserInfo: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, nickname } = useGetUserInfo();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    // const token = getToken();
    // setIsLogin(Boolean(username && token));
    setIsLogin(Boolean(username));
  }, [username]);

  const handleLogout = () => {
    dispatch(logoutReducer()); // 重置 Redux 中存储的用户数据
    removeToken(); // 清空 LocalStorage 中存储的用户标识令牌
    navigate(LOGIN_PATHNAME); // 导航登录页面
    message.success('登出成功');
  };

  return (
    <>
      {isLogin ? (
        <div style={{ color: '#e8e8e8' }}>
          <span>
            <UserOutlined />
            &nbsp;
            {nickname || username}
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
