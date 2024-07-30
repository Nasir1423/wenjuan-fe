import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import { Button, Result } from 'antd';

const NotFound: FC = () => {
  const nav = useNavigate();
  useTitle('问卷星 - 404');
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          onClick={() => {
            nav('/');
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
