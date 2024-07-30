import { FC, useState } from 'react';
import { useTitle } from 'ahooks';
import { Typography } from 'antd';
import QuestionCard from '@components/QuestionCard';
import ListSearch from '@/components/ListSearch';
import Question from '@/types/Question';
import rawQuestionList from '@/mocks/rawQuestionList';
import styles from '../common.module.scss';

const { Title } = Typography;

const List: FC = () => {
  const [questionList] = useState<Question[]>(rawQuestionList);
  useTitle('问卷星 - 我的问卷');

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
  );
};

export default List;
