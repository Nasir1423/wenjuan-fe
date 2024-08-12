import useGetComponentsData from '@/hooks/useGetComponentsData';
import { deleteSelectedComponent, toggleSelectedComponentVisibility } from '@/store/components';
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

const ToolBar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId } = useGetComponentsData();
  // 删除选中组件
  const handleDelete = () => {
    dispatch(deleteSelectedComponent());
  };
  // 隐藏所选中的组件
  const handleHide = () => {
    dispatch(toggleSelectedComponentVisibility({ id: selectedId, isHidden: true }));
  };
  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHide} />
      </Tooltip>
    </Space>
  );
};

export default ToolBar;
