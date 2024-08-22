import useGetComponentsData from '@/hooks/useGetComponentsData';
import {
  copySelectedComponent,
  deleteSelectedComponent,
  pasteCopiedComponent,
  swapComponentPosition,
  toggleComponentLock,
  toggleSelectedComponentVisibility,
} from '@/store/components';
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';

const ToolBar: FC = () => {
  const dispatch = useDispatch();
  const {
    selectedId,
    selectedComponent,
    copiedComponent,
    componentList,
    pastLength,
    futureLength,
  } = useGetComponentsData();
  const { isLocked = false } = selectedComponent || {};
  const selectedIndex = componentList.findIndex(component => component.fe_id === selectedId);
  const length = componentList.length;
  const isUpForbidden = selectedIndex <= 0 || !selectedId;
  const isDownForbidden = selectedIndex + 1 >= length || !selectedId;
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
  // 将当前组件上移
  const moveUp = () => {
    dispatch(swapComponentPosition({ newIndex: selectedIndex - 1, oldIndex: selectedIndex }));
  };
  // 将当前组件下移
  const moveDown = () => {
    dispatch(swapComponentPosition({ newIndex: selectedIndex + 1, oldIndex: selectedIndex }));
  };
  // 撤销
  const undo = () => {
    dispatch(ActionCreators.undo());
  };
  // 重做
  const redo = () => {
    dispatch(ActionCreators.redo());
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
          type={isLocked ? 'primary' : 'default'}
          // style={{ backgroundColor: isLocked ? '#1677ff' : 'transparent' }}
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
      <Tooltip title="上移">
        <Button shape="circle" icon={<UpOutlined />} onClick={moveUp} disabled={isUpForbidden} />
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={moveDown}
          disabled={isDownForbidden}
        />
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={undo} disabled={pastLength <= 0} />
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<RedoOutlined />}
          onClick={redo}
          disabled={futureLength <= 0}
        />
      </Tooltip>
    </Space>
  );
};

export default ToolBar;
