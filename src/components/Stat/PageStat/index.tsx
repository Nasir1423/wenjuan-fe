/* eslint-disable @typescript-eslint/no-explicit-any */
import useGetComponentsData from '@/hooks/useGetComponentsData';
import { getQuestionStatListService } from '@/service/stat';
import { useRequest } from 'ahooks';
import { Pagination, Spin, Table, TableColumnsType, Typography } from 'antd';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const { Title } = Typography;

const PageStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { id = '' } = useParams();
  const { loading } = useRequest(
    async () => await getQuestionStatListService(id, { page, pageSize }),
    {
      onSuccess(data) {
        const { total, list } = data;
        setTotal(total);
        setList(list);
      },
      refreshDeps: [page, pageSize, id], // 刷新依赖，指定数据变化后，会触发请求的重新发送
    }
  );
  const { componentList } = useGetComponentsData();

  // 表格列定义
  const columns: TableColumnsType<{ _id: string; [key: string]: any }> = componentList.map(
    component => {
      const { title, fe_id, props, type } = component;

      let colTitle;
      if (
        type === 'questionCheckbox' ||
        type === 'questionRadio' ||
        type === 'questionTextArea' ||
        type === 'questionInfo'
      ) {
        colTitle = props.title;
      } else {
        colTitle = title;
      }

      return {
        title: (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedComponentId(fe_id);
              setSelectedComponentType(type);
            }}
          >
            <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
              {colTitle}
            </span>
          </div>
        ),
        dataIndex: fe_id,
        align: 'center',
      };
    }
  );

  return (
    <div>
      <Title level={3} style={{ textAlign: 'start' }}>
        答卷数量: {!loading && total}
      </Title>
      {loading ? (
        <Spin style={{ textAlign: 'center' }}></Spin>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={list}
            pagination={false}
            rowKey={record => record._id}
          />
          <Pagination
            align="center"
            total={total}
            pageSize={pageSize}
            current={page}
            onChange={(page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            }}
          />
        </>
      )}
    </div>
  );
};

export default PageStat;
