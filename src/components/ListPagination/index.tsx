import { FC, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
} from '@/hooks/useLoadQuestionListData';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type PropsType = {
  total: number;
};

const ListPagination: FC<PropsType> = (props: PropsType) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { total } = props;

  /* 从 url 中获取 page、pageSize 参数，并同步到 Pagination 组件中 */
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
    setCurrent(page);
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;
    setPageSize(pageSize);
  }, [searchParams]);

  /* 将 Pagination 组件中的数据变化反映到 url 中，此时会发送新的请求获取数据 */
  const handleChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(), // 除了改变 page 和 pageSize 之外，不能抛弃其他参数
    });
  };

  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handleChange}
      align="center"
    />
  );
};

export default ListPagination;
/* 注意：Pagination 的变化和 URL 参数必须保持一致，即受控 */
