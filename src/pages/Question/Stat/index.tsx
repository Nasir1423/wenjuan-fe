import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useTitle } from 'ahooks';

const Stat: FC = () => {
  useTitle('问卷星 - 问卷数据');
  const { id } = useParams();
  return <>Stat {id}</>;
};

export default Stat;
