import useGetComponentsData from '@/hooks/useGetComponentsData';
import useGetPageInfo from '@/hooks/useGetPageInfo';
import { QUESTION_STAT_PATHNAME } from '@/router';
import { updateQuestionService } from '@/service/question';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PublishButton: FC = () => {
  const nav = useNavigate();
  const { id = '' } = useParams();
  const { componentList = [] } = useGetComponentsData();
  const { title, desc, css, js } = useGetPageInfo();

  // 手动保存
  const { loading: isDataPublishing, run: pub } = useRequest(
    async () => {
      const params = { title, desc, js, css, componentList, isPublished: true };
      await updateQuestionService(id, params);
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功');
        nav(`${QUESTION_STAT_PATHNAME}/${id}`);
      },
    }
  );

  return (
    <Button type="primary" onClick={pub} disabled={isDataPublishing}>
      发布
    </Button>
  );
};

export default PublishButton;
