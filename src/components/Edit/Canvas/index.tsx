import { FC, MouseEvent } from 'react';
import styles from './index.module.scss';
import { Spin } from 'antd';
import useGetComponentsData from '@/hooks/useGetComponentsData';
import { getComponentByInfo } from '@/components/QuestionComponents';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { changeSelectedId, swapComponentPosition } from '@/store/components';
import SortableContainer from '@/components/DragSortable/SortableContainer';
import SortableItem from '@/components/DragSortable/SortableItem';

type PropsType = {
  loading: boolean;
};

const Canvas: FC<PropsType> = (props: PropsType) => {
  const { loading } = props;
  const { componentList = [], selectedId = '' } = useGetComponentsData();
  const dispatch = useDispatch();
  const handleClick = (event: MouseEvent<HTMLDivElement>, id: string) => {
    event.stopPropagation(); // 避免事件冒泡到其父元素，从而触发父元素清空 selectedId 的逻辑
    dispatch(changeSelectedId(id));
  };

  const swapComponent = (oldIndex: number, newIndex: number) => {
    dispatch(swapComponentPosition({ oldIndex, newIndex }));
  };
  const componentListWithId = componentList.map(component => ({
    ...component,
    id: component.fe_id,
  }));

  const renderLoading = <Spin style={{ marginTop: '30px' }} />;
  const renderContent = (
    <SortableContainer componentList={componentListWithId} swapComponent={swapComponent}>
      <div>
        {componentList
          .filter(component => !component.isHidden)
          .map(component => {
            const { fe_id, isLocked } = component;
            const wrapperDefaultClassName = styles.componentWrapper;
            const selectedClassName = styles.selected;
            const lockedClassName = styles.locked;
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked,
            });
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div className={wrapperClassName} onClick={event => handleClick(event, fe_id)}>
                  <div className={styles.component}>{getComponentByInfo(component)}</div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
  return <div className={styles.canvas}>{loading ? renderLoading : renderContent}</div>;
};

export default Canvas;
