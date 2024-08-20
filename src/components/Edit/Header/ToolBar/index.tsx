import useGetComponentsData from '@/hooks/useGetComponentsData';
import {
  copySelectedComponent,
  deleteSelectedComponent,
  pasteCopiedComponent,
  toggleComponentLock,
  toggleSelectedComponentVisibility,
} from '@/store/components';
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

const ToolBar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentsData();
  const { isLocked = false } = selectedComponent || {};
  // 删除选中组件
  const handleDelete = () => {
    dispatch(deleteSelectedComponent());
  };
  // 隐藏所选中的组件
  const handleHide = () => {
    dispatch(toggleSelectedComponentVisibility({ id: selectedId, isHidden: true }));
  };
  // 锁定所选中的组件
  const handleLock = () => {
    dispatch(toggleComponentLock({ id: selectedId }));
  };
  // 复制所选中的组件
  const handleCopy = () => {
    dispatch(copySelectedComponent());
  };
  // 粘贴组件到指定位置
  const handlePaste = () => {
    dispatch(pasteCopiedComponent());
  };
  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHide} />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          style={{ backgroundColor: isLocked ? '#1677ff' : 'transparent' }}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent === null}
        />
      </Tooltip>
    </Space>
  );
};

export default ToolBar;
