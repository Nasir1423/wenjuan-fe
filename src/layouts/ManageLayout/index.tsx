import { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Space, Button, Divider, message } from 'antd';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';

import { QUESTION_EDIT_PATHNAME } from '@/router';
import { createQuestionService } from '@/service/question';
import styles from './index.module.scss';

const ManageLayout: FC = () => {
  const nav = useNavigate(); // 用于路由的编程导航
  const { pathname } = useLocation(); // 用于获取当前路由

  const { run: handleCreateClick } = useRequest(createQuestionService, {
    manual: true, // 此时可以调用返回的 run 触发异步函数的执行
    onSuccess(data) {
      // 设置数据请求成功时执行的回调
      const { id } = data || {};
      if (id) {
        nav(`${QUESTION_EDIT_PATHNAME}/${id}`);
        message.success('问卷创建成功');
      }
    },
    debounceWait: 1000, // 设置防抖
  });

  return (
    <div className={styles.container}>
      <nav className={styles.left}>
        <Space direction="vertical" align="center">
          <Button type="primary" size="large" icon={<PlusOutlined />} onClick={handleCreateClick}>
            新建问卷
          </Button>
          <Divider style={{ border: 'transparent' }}></Divider>
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            onClick={() => nav('/manage/list')}
            icon={<BarsOutlined />}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            onClick={() => nav('/manage/star')}
            icon={<StarOutlined />}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            onClick={() => nav('/manage/trash')}
            icon={<DeleteOutlined />}
          >
            回收站
          </Button>
        </Space>
      </nav>
      <main className={styles.right}>
        <Outlet />
      </main>
    </div>
  );
};

export default ManageLayout;
