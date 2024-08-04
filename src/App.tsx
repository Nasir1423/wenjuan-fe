import { FC } from 'react';
import Routes from './router';
import './App.css';

const App: FC = () => {
  return <Routes />;
};

export default App;

/* 
  src/components --- 组件（零件）
  src/pages      --- 页面（跳转、切换、大面积的），关注业务
*/
