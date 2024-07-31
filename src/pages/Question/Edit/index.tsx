import { FC } from 'react';
import { useTitle } from 'ahooks';
import useLoadingData from '@/hooks/useLoadQuestionData';

const Edit: FC = () => {
  useTitle('问卷星 - 编辑问卷');
  const { loading, data } = useLoadingData();

  return (
    <>
      <p>Edit Page</p>
      {loading ? <p>loading question info...😅</p> : <p>{JSON.stringify(data)}</p>}
    </>
  );
};

export default Edit;
