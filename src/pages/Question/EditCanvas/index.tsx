import { FC } from 'react';
import styles from './index.module.scss';
import { Spin } from 'antd';
import useGetComponentsData from '@/hooks/useGetComponentsData';
import { getComponentByInfo } from '@/components/QuestionComponents';

type PropsType = {
  loading: boolean;
};

const EditCanvas: FC<PropsType> = (props: PropsType) => {
  const { loading } = props;
  const { componentList = [] } = useGetComponentsData();
  return (
    <div className={styles.canvas}>
      {loading ? (
        <Spin style={{ marginTop: '30px' }} />
      ) : (
        componentList.map(component => (
          <div className={styles['component-wrapper']} key={component.fe_id}>
            <div className={styles.component}>{getComponentByInfo(component)}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default EditCanvas;
