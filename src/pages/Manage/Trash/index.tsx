import { FC, useState } from 'react';
import { Typography, Empty, Tag, Table, Space, Button, Modal, Spin, message } from 'antd';
import type { Key } from 'react';
import type { TableColumnsType } from 'antd';
import { useRequest, useTitle } from 'ahooks';

import useLoadQuestionListData from '@/hooks/useLoadQuestionListData';
import ListSearch from '@/components/ListSearch';
import Question from '@/types/Question';
import styles from '../common.module.scss';
import ListPagination from '@/components/ListPagination';
import { deleteQuestionsService, updateQuestionService } from '@/service/question';

const { Title } = Typography;
const { confirm } = Modal;
interface TableElemProps {
  source: Question[];
  refreash: () => void;
}
const TableElem: FC<TableElemProps> = ({ source, refreash }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const columns: TableColumnsType<Question> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title', // 如果不设置，则将默认使用 dataIndex
      align: 'center',
    },
    {
      title: '发布状态',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>;
      },
      align: 'center',
    },
    {
      title: '答卷数量',
      dataIndex: 'answerCount',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
    },
  ];

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('恢复成功');
        refreash(); // 刷新，用于重新获取数据
        setSelectedIds([]);
      },
    }
  );

  const handleRecover = () => {
    confirm({
      title: '恢复确认',
      content: '你确认恢复吗？',
      onOk: () => {
        recover();
      },
      onCancel: () => {
        console.log('恢复操作取消');
      },
    });
  };

  // 删除
  const { run: deleteQuestions } = useRequest(async () => deleteQuestionsService(selectedIds), {
    manual: true,
    debounceWait: 500,
    onSuccess() {
      message.success('所选问卷已彻底删除');
      refreash(); // 刷新，用于重新获取数据
      setSelectedIds([]);
    },
  });

  const handleDelete = () => {
    confirm({
      title: '删除确认',
      content: '你确认彻底删除吗？一旦删除将无法恢复',
      onOk: () => {
        deleteQuestions();
      },
      onCancel: () => {
        console.log('删除操作取消');
      },
    });
  };

  return (
    <>
      <Space style={{ marginBottom: '20px' }}>
        <Button
          size="middle"
          type="primary"
          disabled={selectedIds.length === 0}
          onClick={handleRecover}
        >
          恢复
        </Button>
        <Button
          size="middle"
          type="primary"
          danger
          disabled={selectedIds.length === 0}
          onClick={handleDelete}
        >
          删除
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={source}
        pagination={false}
        rowKey={record => record.id}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys: Key[]) => {
            setSelectedIds(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );
};

const Trash: FC = () => {
  useTitle('问卷星 - 回收站');
  const { loading, data = {}, refresh } = useLoadQuestionListData();
  const { list: questionList, total } = data as { list: Question[]; total: number };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>标星问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      {loading && (
        <div className={styles.spinContainer}>
          <Spin size="large"></Spin>
        </div>
      )}
      {!loading && (
        <>
          <div className={styles.content}>
            {questionList.length <= 0 ? (
              <Empty description="暂无数据" />
            ) : (
              <TableElem source={questionList} refreash={refresh} />
            )}
          </div>
          <div className={styles.footer}>
            <ListPagination total={total} />
          </div>
        </>
      )}
    </>
  );
};

export default Trash;
