import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Input } from 'antd';

const { Search } = Input;

const ListSearch: FC = () => {
  const [keywords, setKeywords] = useState('');
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    /* 根据当前页面的 url query 参数设置搜索框的值 */
    const curKeyword = searchParams.get('keywords') || '';
    setKeywords(curKeyword);
  }, [searchParams]);

  const handleSearch = (value: string) => {
    /* 跳转页面，增加 url query 参数 */
    console.log('正在搜索 ', value, ' 相关内容');
    nav({ pathname, search: `keywords=${value}` });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeywords(event.target.value);
  };

  return (
    <>
      <Search
        placeholder="请输入关键字"
        allowClear
        size="large"
        value={keywords}
        onSearch={handleSearch}
        onChange={handleChange}
        style={{ width: '260px' }}
      />
    </>
  );
};

export default ListSearch;
/* 
  搜索框应该设置为一个受控组件，使得组件的 value 和 state 保持同步。关于搜索还需要考虑问题，
    - 点击搜索后，跳转到什么路由？携带什么参数？
*/
