import { FC } from 'react';
import styles from './index.module.scss';
import QuestionTitle from '@/components/QuestionComponents/QuestionTitle';
import QuestionInput from '@/components/QuestionComponents/QuestionInput';

type ComponentType = {
  id: string;
  type: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: { [key: string]: any };
};

type PropsType = {
  componentList: ComponentType[];
};

const EditCanvasComponent: FC<ComponentType> = (props: ComponentType) => {
  const { type, props: componentProps } = props;
  if (type === 'questionTitle') return <QuestionTitle {...componentProps} />;
  else if (type === 'questionInput') return <QuestionInput {...componentProps} />;
  else return <h1>非法的组件信息</h1>;
};

const EditCanvas: FC<PropsType> = (props: PropsType) => {
  const { componentList } = props;
  return (
    <div className={styles.canvas}>
      {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>

      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
      {componentList.map(component => (
        <div className={styles['component-wrapper']} key={component.id}>
          <div className={styles.component}>
            <EditCanvasComponent {...component} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditCanvas;
