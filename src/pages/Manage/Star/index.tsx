import { FC } from 'react';
import { useTitle } from 'ahooks';
import { Typography, Empty, Spin } from 'antd';

import QuestionCard from '@components/QuestionCard';
import ListSearch from '@/components/ListSearch';
import Question from '@/types/Question';
import styles from '../common.module.scss';
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData';
import ListPagination from '@/components/ListPagination';

const { Title } = Typography;

const Star: FC = () => {
  useTitle('问卷星 - 星标问卷');
  const { loading, data = {} } = useLoadQuestionListData();
  const { list: questionList, total } = data as { list: Question[]; total: number };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>标星问卷</Title>
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
          <div className={styles.content}>
            {questionList.length <= 0 ? (
              <Empty description="暂无数据" />
            ) : (
              questionList.map(question => {
                const { id } = question;
                return <QuestionCard key={id} {...question} />;
              })
            )}
          </div>
          <div className={styles.footer}>
            <ListPagination total={total} />
          </div>
        </>
      )}
    </>
  );
};

export default Star;
