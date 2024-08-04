import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Logo from '@/components/Logo';
import UserInfo from '@/components/UserInfo';
import styles from './index.module.scss';
import useEnsureUserData from '@/hooks/useEnsureUserData';
import useNavPage from '@/hooks/useNavPage';

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
  const isUserDataLoaded = useEnsureUserData();
  useNavPage(isUserDataLoaded);
  return (
    <Layout>
      <Header className={styles.header}>
        <Logo />
        <UserInfo />
      </Header>
      <Content className={styles.content}>
        {isUserDataLoaded ? <Spin></Spin> : <Outlet></Outlet>}
      </Content>
      <Footer className={styles.footer}>问卷星 &copy;2024 - present.</Footer>
    </Layout>
  );
};

export default MainLayout;
