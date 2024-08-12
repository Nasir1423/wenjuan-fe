import { FC, MouseEvent } from 'react';
import styles from './index.module.scss';
import { Spin } from 'antd';
import useGetComponentsData from '@/hooks/useGetComponentsData';
import { getComponentByInfo } from '@/components/QuestionComponents';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '@/store/components';

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

  const renderLoading = <Spin style={{ marginTop: '30px' }} />;
  const renderContent = componentList
    .filter(component => !component.isHidden)
    .map(component => {
      const { fe_id } = component;
      const wrapperDefaultClassName = styles['component-wrapper'];
      const selectedClassName = styles.selected;
      const wrapperClassName = classNames({
        [wrapperDefaultClassName]: true,
        [selectedClassName]: fe_id === selectedId,
      });
      return (
        <div className={wrapperClassName} key={fe_id} onClick={event => handleClick(event, fe_id)}>
          <div className={styles.component}>{getComponentByInfo(component)}</div>
        </div>
      );
    });
  return <div className={styles.canvas}>{loading ? renderLoading : renderContent}</div>;
};

export default Canvas;
