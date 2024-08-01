import { FC, useEffect, useRef, useState } from 'react';
import { useDebounceFn, useRequest, useTitle } from 'ahooks';
import { Empty, Spin, Typography } from 'antd';

import QuestionCard from '@components/QuestionCard';
import ListSearch from '@/components/ListSearch';
import styles from '../common.module.scss';
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '@/hooks/useLoadQuestionListData';
import Question from '@/types/Question';
import { getQuestionListService } from '@/service/question';
import { useSearchParams } from 'react-router-dom';

const { Title } = Typography;

const List: FC = () => {
  useTitle('问卷星 - 我的问卷');

  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [searchParams] = useSearchParams();
  const keywords = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';

  const containerRef = useRef<HTMLDivElement>(null);

  const { run: load, loading } = useRequest(
    async () => {
      const searchOptions = { keywords, page, pageSize: LIST_PAGE_SIZE };
      return await getQuestionListService(searchOptions);
    },
    {
      manual: true,
      onSuccess(data) {
        const { list = [], total = 0 } = data;
        setQuestionList(prevList => prevList.concat(list));
        setPage(prevPage => prevPage + 1);
        setHasMore(questionList.length + list.length < total);
      },
    }
  );

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      if (!hasMore || loading) return;

      const decisionElement = containerRef.current;
      if (!decisionElement) return;

      const decisionRect = decisionElement.getBoundingClientRect();
      if (decisionRect.bottom <= document.documentElement.clientHeight) {
        load();
      }
    },
    { wait: 1000 }
  );

  useEffect(() => {
    window.addEventListener('scroll', tryLoadMore);
    return () => window.removeEventListener('scroll', tryLoadMore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    setPage(1);
    setQuestionList([]);
    setHasMore(true);
    load();
  }, [searchParams, load]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {questionList.length > 0
          ? questionList.map(question => <QuestionCard key={question.id} {...question} />)
          : !loading && <Empty description="暂无数据" />}
      </div>

      <div className={styles.footer}>
        <div ref={containerRef}>
          {loading ? (
            <Spin size="large" />
          ) : !hasMore && questionList.length > 0 ? (
            <span>没有更多了</span>
          ) : (
            <span>开始加载下一页</span>
          )}
        </div>
      </div>
    </>
  );
};

export default List;
