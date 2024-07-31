import { useTitle } from 'ahooks';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';

import { MANAGE_LIST_PATHNAME } from '@/router';
import styles from './index.module.scss';

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  /*   useEffect(() => {
    axios.get('/api/test').then(res => console.log('axios get', res));
    axios.post('/api/question').then(res => console.log('axios post', res));
  }, []); */
  const nav = useNavigate();
  useTitle('问卷星');
  return (
    <div className={styles.container}>
      <Title>问卷调查 | 在线投票</Title>
      <Paragraph>已累计创建问卷 1090 份，发布问卷 100 份，收到答卷 1000 份</Paragraph>
      <div className={styles.info}>
        <Button type="primary" onClick={() => nav(MANAGE_LIST_PATHNAME)} size="large">
          开始使用
        </Button>
      </div>
    </div>
  );
};

export default Home;
