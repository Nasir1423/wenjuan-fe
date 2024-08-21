import useGetComponentsData from '@/hooks/useGetComponentsData';
import {
  changeComponentTitle,
  changeSelectedId,
  toggleComponentLock,
  toggleSelectedComponentVisibility,
} from '@/store/components';
import { Button, Input, message, Space } from 'antd';
import { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import classNames from 'classnames';
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentsData();
  const dispatch = useDispatch();
  const [titleChangingId, setTitleChangingId] = useState('');

  /**
   * @description 当用户点击组件对应的标题时，要执行的操作（选中 | 提示）
   * @param id 新选中的组件 id
   */
  const handleTitleClick = (id: string) => {
    const index = componentList.findIndex(component => component.fe_id === id);
    if (index === -1) return; // 选中的组件 id 非法
    const { isHidden } = componentList[index];
    if (isHidden) return message.info('不能选中隐藏的组件'); // 选中的组件被隐藏
    if (selectedId === id) return setTitleChangingId(id); // 选中已选中的组件

    dispatch(changeSelectedId(id));
    setTitleChangingId('');
  };

  /**
   * @description 修改被选中的组件的 title
   */
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: newTitle } = event.target;
    if (!newTitle) return; // 新 title 为空，因此不修改
    if (!selectedId) return; // 不存在被选中的组件，因此不修改
    dispatch(changeComponentTitle({ id: selectedId, newTitle }));
  };

  /**
   * @description 修改指定 id 的组件的可见性
   */
  const handleIsHiddenChange = (id: string, isHidden: boolean) => {
    console.log({ id, isHidden });
    dispatch(toggleSelectedComponentVisibility({ id, isHidden }));
  };

  /**
   * @description 修改指定 id 的组件的可修改性
   */
  const handleIsLockedChange = (id: string) => {
    dispatch(toggleComponentLock({ id }));
  };

  return (
    <>
      {componentList.map(component => {
        const { fe_id, title, isHidden, isLocked } = component;

        // 拼接 title 的样式
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });

        return (
          <div key={fe_id} className={styles.wrapper}>
            <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
              {titleChangingId === fe_id && (
                <Input
                  value={title}
                  onChange={handleTitleChange}
                  onPressEnter={() => setTitleChangingId('')}
                  onBlur={() => setTitleChangingId('')}
                />
              )}
              {titleChangingId !== fe_id && title}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  icon={<EyeInvisibleOutlined />}
                  type={isHidden ? 'primary' : 'text'}
                  onClick={() => handleIsHiddenChange(fe_id, !isHidden)}
                  className={isHidden ? '' : styles.btn}
                />
                <Button
                  size="small"
                  shape="circle"
                  icon={<LockOutlined />}
                  type={isLocked ? 'primary' : 'text'}
                  onClick={() => handleIsLockedChange(fe_id)}
                  className={isLocked ? '' : styles.btn}
                />
              </Space>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Layers;
