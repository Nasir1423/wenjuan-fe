import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './index.module.scss';

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div>Logo</div>
        <div>登录</div>
      </Header>
      <Content className={styles.content}>
        <Outlet></Outlet>
      </Content>
      <Footer className={styles.footer}>问卷星 &copy;2024 - present.</Footer>
    </Layout>
  );
};

export default MainLayout;
