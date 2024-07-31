import { FC, useState } from 'react';
import { Typography, Empty, Tag, Table, Space, Button, Modal, Spin } from 'antd';
import type { Key } from 'react';
import type { TableColumnsType } from 'antd';
import { useTitle } from 'ahooks';

import useLoadQuestionListData from '@/hooks/useLoadQuestionListData';
import ListSearch from '@/components/ListSearch';
import Question from '@/types/Question';
import styles from '../common.module.scss';

const { Title } = Typography;
const { confirm } = Modal;
interface TableElemProps {
  source: Question[];
}
const TableElem: FC<TableElemProps> = ({ source }) => {
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
      dataIndex: 'createAt',
      align: 'center',
    },
  ];

  const handleRecover = () => {
    confirm({
      title: '恢复确认',
      content: '你确认恢复吗？',
      onOk: () => {
        alert('执行恢复操作！');
      },
      onCancel: () => {
        console.log('恢复操作取消');
      },
    });
  };

  const handleDelete = () => {
    confirm({
      title: '删除确认',
      content: '你确认彻底删除吗？一旦删除将无法恢复',
      onOk: () => {
        alert('执行删除操作！');
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
  const { loading, data = {} } = useLoadQuestionListData();
  const { list: questionList } = data as { list: Question[] };

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
          {' '}
          <div className={styles.content}>
            {questionList.length <= 0 ? (
              <Empty description="暂无数据" />
            ) : (
              <TableElem source={questionList} />
            )}
          </div>
          <div className={styles.footer}>分页</div>
        </>
      )}
    </>
  );
};

export default Trash;
