import { useTitle } from 'ahooks';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
  useTitle('问卷星');
  const nav = useNavigate();

  return (
    <>
      <p>Home</p>
      <div>
        <button onClick={() => nav('login')}>登录</button>
      </div>
      <div>
        <button onClick={() => nav('register')}>注册</button>
      </div>
      <div>
        <Link to="/manage/list">我的</Link>
      </div>
    </>
  );
};

export default Home;
