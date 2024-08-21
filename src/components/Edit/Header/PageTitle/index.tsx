import useGetPageInfo from '@/hooks/useGetPageInfo';
import { changeTitle } from '@/store/pageInfo';
import { EditOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space, Typography } from 'antd';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const { Title } = Typography;

const PageTitle: FC = () => {
  const { title } = useGetPageInfo();
  const dispatch = useDispatch();
  const [isTitleEditing, setIsTitleEditing] = useState(false);

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isTitleEditing && inputRef.current) inputRef.current.focus();
  }, [isTitleEditing]);

  // 修改页面标题
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: newTitle } = event.target;
    if (!newTitle.trim()) return;
    dispatch(changeTitle({ newTitle }));
  };

  if (isTitleEditing) {
    /* 编辑状态 - 标题部分显示输入框 */
    return (
      <Input
        ref={inputRef}
        value={title}
        onPressEnter={() => setIsTitleEditing(false)}
        onBlur={() => setIsTitleEditing(false)}
        onChange={handleChange}
      />
    );
  } else {
    /* 非编辑状态 - 标题部分显示标题 + 修改按钮 */
    return (
      <Space>
        <Title style={{ fontSize: '18px', lineHeight: '1', margin: '0' }}>{title}</Title>
        <Button
          icon={<EditOutlined />}
          type="text"
          onClick={() => setIsTitleEditing(true)}
        ></Button>
      </Space>
    );
  }
};

export default PageTitle;
