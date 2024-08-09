import { componentGroup, ComponentType, getComponentByInfo } from '@/components/QuestionComponents';
import { Typography } from 'antd';
import { FC } from 'react';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { insertComponent } from '@/store/components';
import { nanoid } from '@reduxjs/toolkit';

const { Title } = Typography;

const ComponentLib: FC = () => {
  const dispatch = useDispatch();

  // 给画布添加一个新的组件
  const insertNewComponent = (component: ComponentType) => {
    /* 注意：这里的 component 不能修改！
    因为这是要添加到 componentList 中的数据信息，必须是新引用的，
    否则多次添加的 component 会具有同一个引用。 */
    const newComponent = JSON.parse(JSON.stringify(component));
    dispatch(insertComponent({ ...newComponent, fe_id: nanoid(5) }));
  };

  return (
    <>
      {componentGroup.map((group, gIndex) => {
        /* 渲染每一个 group */
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId}>
            <Title level={5} style={{ marginTop: gIndex > 0 ? '20px' : '0px' }}>
              {groupName}
            </Title>
            {components.map((component, cIndex) => (
              /* 渲染 group 中的每一个组件 */
              <div
                className={styles.wrapper}
                key={cIndex}
                onClick={() => insertNewComponent(component)}
              >
                <div className={styles.component}>{getComponentByInfo(component)}</div>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;
