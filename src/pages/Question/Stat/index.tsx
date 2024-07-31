import { FC } from 'react';
import { useTitle } from 'ahooks';
import useLoadingData from '@/hooks/useLoadQuestionData';

const Stat: FC = () => {
  useTitle('问卷星 - 问卷数据');
  const { loading, data } = useLoadingData();

  return (
    <>
      <p>Stat Page</p>
      {loading ? <p>loading question info...😅</p> : <p>{JSON.stringify(data)}</p>}
    </>
  );
};

export default Stat;
