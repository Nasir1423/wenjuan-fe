import useEnsureUserData from '@/hooks/useEnsureUserData';
import useNavPage from '@/hooks/useNavPage';
import { Spin } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const QuestionLayout: FC = () => {
  const isUserDataLoaded = useEnsureUserData();
  useNavPage(isUserDataLoaded);
  return (
    /* 这样设置 height，是为了抵消 body 自带的 margin: 8px，从而避免页面整体出现滚动 */
    <div style={{ height: `calc(100vh - 16px)`, textAlign: 'center' }}>
      {isUserDataLoaded ? <Spin style={{ marginTop: '50px' }}></Spin> : <Outlet />}
    </div>
  );
};

export default QuestionLayout;
