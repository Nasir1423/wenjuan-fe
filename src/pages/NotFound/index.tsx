import { useTitle } from 'ahooks';
import { FC } from 'react';

const NotFound: FC = () => {
  useTitle('问卷星 - 404');
  return <>NotFound</>;
};

export default NotFound;
