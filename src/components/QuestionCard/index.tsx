import { FC } from 'react';
import { Button, Space, Divider, Tag, Modal } from 'antd';
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

const { confirm } = Modal;

const showDuplicateComfirm = () => {
  confirm({
    title: '复制确认',
    icon: <CopyOutlined />,
    content: '你确认复制吗?',
    onOk() {
      alert('执行赋值操作');
    },
    onCancel() {
      console.log('取消复制操作');
    },
  });
};

const showDeleteConfirm = () => {
  confirm({
    title: '删除确认',
    icon: <DeleteOutlined />,
    content: '你确认删除吗？七天内你可以从回收站找回!',
    onOk() {
      alert('执行删除操作');
    },
    onCancel() {
      console.log('取消删除操作');
    },
  });
};

const QuestionCard: FC<Question> = props => {
  const nav = useNavigate();
  const { id, title, isStar, isPublished, answerCount, createAt } = props;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `${QUESTION_STAT_PATHNAME}/${id}` : `${QUESTION_EDIT_PATHNAME}/${id}`}
          >
            <Space>
              {title}
              {isStar && <StarOutlined style={{ color: 'rgb(249, 192, 29)' }} />}
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
      <div className={styles['button-container']}>
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
          <Button type="text" size="small" icon={<StarOutlined />}>
            {isStar ? '取消标星' : '标星'}
          </Button>
          <Button type="text" size="small" icon={<CopyOutlined />} onClick={showDuplicateComfirm}>
            复制
          </Button>
          <Button type="text" size="small" icon={<DeleteOutlined />} onClick={showDeleteConfirm}>
            删除
          </Button>
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
