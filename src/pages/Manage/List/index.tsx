import { FC } from 'react';
import { useTitle } from 'ahooks';
import { Spin, Typography } from 'antd';

import QuestionCard from '@components/QuestionCard';
import ListSearch from '@/components/ListSearch';
import styles from '../common.module.scss';
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData';
import Question from '@/types/Question';

const { Title } = Typography;

const List: FC = () => {
  useTitle('问卷星 - 我的问卷');
  const { loading, data = {} } = useLoadQuestionListData();
  const { list: questionList } = data as { list: Question[] };

  return (
    <>
      {/* 头部：页面标题 + 搜索框 */}
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      {loading && (
        <div className={styles.spinContainer}>
          <Spin size="large"></Spin>
        </div>
      )}
      {!loading && (
        <>
          {/* 主体：渲染列表 */}
          <div className={styles.content}>
            {questionList.length > 0 &&
              questionList.map(question => {
                const { id } = question;
                return <QuestionCard key={id} {...question} />;
              })}
          </div>
          {/* 页脚 */}
          <div className={styles.footer}>LoadMore...</div>
        </>
      )}
    </>
  );
};

export default List;
