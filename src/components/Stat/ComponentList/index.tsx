import useGetComponentsData from '@/hooks/useGetComponentsData';
import { FC } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { getComponentByInfo } from '@/components/QuestionComponents';

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const ComponentList: FC<PropsType> = (props: PropsType) => {
  const { componentList = [] } = useGetComponentsData();
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;

  const renderContent = (
    <div className={styles.canvas}>
      {componentList
        .filter(component => !component.isHidden)
        .map(component => {
          const { fe_id, type } = component;
          const wrapperDefaultClassName = styles.componentWrapper;
          const selectedClassName = styles.selected;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId,
          });
          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={() => {
                setSelectedComponentId(fe_id);
                setSelectedComponentType(type);
              }}
            >
              <div className={styles.component}>{getComponentByInfo(component)}</div>
            </div>
          );
        })}
    </div>
  );
  return <div className={styles.canvas}>{renderContent}</div>;
};

export default ComponentList;
