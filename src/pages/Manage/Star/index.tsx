import { FC, useState } from 'react';
import { useTitle } from 'ahooks';
import { Typography, Empty } from 'antd';

import QuestionCard from '@components/QuestionCard';
import ListSearch from '@/components/ListSearch';
import Question from '@/types/Question';
import rawQuestionList from '@/mocks/rawQuestionList';
import styles from '../common.module.scss';

const { Title } = Typography;
const rawStarQuestionList = rawQuestionList.filter(question => question.isStar);

const Star: FC = () => {
  const [questionList] = useState<Question[]>(rawStarQuestionList);
  useTitle('问卷星 - 星标问卷');
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
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Star;
