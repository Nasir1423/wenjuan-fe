import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useTitle } from 'ahooks';

const Edit: FC = () => {
  useTitle('问卷星 - 编辑问卷');
  const { id } = useParams();
  return <>Edit {id}</>;
};

export default Edit;
