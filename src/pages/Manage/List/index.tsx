import { FC, useState } from 'react';
import QuestionCard from '@components/QuestionCard';
import styles from './index.module.scss';
import Question from '@/types/Question';
import rawQuestionList from '@/mocks/rawQuestionList';
import { useTitle } from 'ahooks';

const List: FC = () => {
  const [questionList] = useState<Question[]>(rawQuestionList);
  useTitle('问卷星 - 我的问卷');
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}> (搜索) </div>
      </div>
      <div className={styles.content}>
        {questionList.map(question => {
          const { id } = question;
          return <QuestionCard key={id} {...question} />;
        })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  );
};

export default List;
