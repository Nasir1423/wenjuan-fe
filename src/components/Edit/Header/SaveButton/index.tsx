import useGetComponentsData from '@/hooks/useGetComponentsData';
import useGetPageInfo from '@/hooks/useGetPageInfo';
import { updateQuestionService } from '@/service/question';
import { LoadingOutlined } from '@ant-design/icons';
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks';
import { Button } from 'antd';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const SaveButton: FC = () => {
  const { id = '' } = useParams();
  const { componentList = [] } = useGetComponentsData();
  const { title, desc, css, js } = useGetPageInfo();

  // 手动保存
  const { loading: isDataSaving, run: saveData } = useRequest(
    async () => {
      const params = { title, desc, js, css, componentList };
      await updateQuestionService(id, params);
    },
    { manual: true }
  );

  // 自动保存（注意防抖）
  useDebounceEffect(
    () => {
      !isDataSaving && saveData();
    },
    [componentList, title, desc, css, js],
    { wait: 1000 }
  );

  // 快捷键保存 ctrl + s | meta + s
  useKeyPress([], (event: KeyboardEvent) => {
    event.preventDefault();
    !isDataSaving && saveData();
  });

  return (
    <Button
      type="primary"
      onClick={saveData}
      icon={isDataSaving && <LoadingOutlined />}
      disabled={isDataSaving}
    >
      保存
    </Button>
  );
};

export default SaveButton;
