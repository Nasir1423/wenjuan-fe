import { useTitle } from 'ahooks';
import { FC } from 'react';

const Trash: FC = () => {
  useTitle('问卷星 - 回收站');
  return <>Trash</>;
};

export default Trash;
