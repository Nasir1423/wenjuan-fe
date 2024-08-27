import { FC, useState } from 'react';
import { Button, Space, Divider, Tag, Modal, message } from 'antd';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { QUESTION_EDIT_PATHNAME, QUESTION_STAT_PATHNAME } from '@/router';
import Question from '@/types/Question';
import styles from './index.module.scss';
import { useRequest } from 'ahooks';
import { duplicateQuestionService, updateQuestionService } from '@/service/question';

const { confirm } = Modal;

const showDuplicateComfirm = (duplicate: () => void) => {
  confirm({
    title: '复制确认',
    icon: <CopyOutlined />,
    content: '你确认复制吗?',
    onOk() {
      duplicate();
    },
    onCancel() {
      console.log('取消复制操作');
    },
  });
};

const showDeleteConfirm = (deleteQuestion: () => void) => {
  confirm({
    title: '删除确认',
    icon: <DeleteOutlined />,
    content: '你确认删除吗？七天内你可以从回收站找回!',
    onOk() {
      deleteQuestion();
    },
    onCancel() {
      console.log('取消删除操作');
    },
  });
};

const QuestionCard: FC<Question> = props => {
  const nav = useNavigate();
  const { id, title, isStar, isPublished, answerCount, createAt } = props;
  const [isStarState, setIsStarState] = useState(isStar);
  const [isDeletedState, setIsDeletedState] = useState(false);

  // 标星
  const { run: changeStarState, loading: changeStarStateLoading } = useRequest(
    async () => await updateQuestionService(id, { isStar: !isStarState }),
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState);
        message.success(isStarState ? '取消标星成功' : '标星成功');
      },
    }
  );

  // 复制
  const { run: duplicate, loading: duplicateLoading } = useRequest(
    async () => await duplicateQuestionService(id),
    {
      manual: true,
      onSuccess(res) {
        message.success('复制成功');
        nav(`/question/edit/${res.id}`);
      },
    }
  );

  // 删除
  const { run: deleteQuestion, loading: deleteQuestionLoading } = useRequest(
    async () => await updateQuestionService(id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        setIsDeletedState(true);
        message.success('删除成功');
      },
    }
  );
  if (isDeletedState) return null;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `${QUESTION_STAT_PATHNAME}/${id}` : `${QUESTION_EDIT_PATHNAME}/${id}`}
          >
            <Space>
              {title}
              {isStarState && <StarOutlined style={{ color: 'rgb(249, 192, 29)' }} />}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷: {answerCount}</span>
            <span>{createAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['buttonContainer']}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                nav(`${QUESTION_EDIT_PATHNAME}/${id}`);
              }}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              onClick={() => {
                nav(`${QUESTION_STAT_PATHNAME}/${id}`);
              }}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Button
            type="text"
            size="small"
            icon={<StarOutlined />}
            onClick={changeStarState}
            disabled={changeStarStateLoading}
          >
            {isStarState ? '取消标星' : '标星'}
          </Button>
          <Button
            type="text"
            size="small"
            icon={<CopyOutlined />}
            onClick={() => showDuplicateComfirm(duplicate)}
            disabled={duplicateLoading}
          >
            复制
          </Button>
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(deleteQuestion)}
            disabled={deleteQuestionLoading}
          >
            删除
          </Button>
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
