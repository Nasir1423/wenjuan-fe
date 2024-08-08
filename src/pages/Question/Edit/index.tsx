import { FC } from 'react';
import { useTitle } from 'ahooks';
import EditCanvas from '../EditCanvas';
import styles from './index.module.scss';
import useLoadQuestionData from '@/hooks/useLoadQuestionData';
import { Spin } from 'antd';

const Edit: FC = () => {
  useTitle('问卷星 - 编辑问卷');
  const { loading, data } = useLoadQuestionData();

  // return (
  //   <>
  //     <p>Edit Page</p>
  //     {loading ? <p>loading question info...😅</p> : <p>{JSON.stringify(data)}</p>}
  //   </>
  // );
  return (
    <>
      {loading ? (
        <Spin style={{ textAlign: 'center', marginTop: '30px' }} />
      ) : (
        <div className={styles.container}>
          {/* Header - 工具栏 */}
          <div className={styles.header}>Header</div>
          {/* Content */}
          <div className={styles['content-wrapper']}>
            <div className={styles.content}>
              {/* 左侧（组件库 + 图层） */}
              <div className={styles.left}>Left</div>
              {/* 中间（画布） */}
              <div className={styles.main}>
                <div className={styles['canvas-wrapper']}>
                  <div className={styles.canvas}>
                    <EditCanvas componentList={data!.componentList} />
                  </div>
                </div>
              </div>
              {/* 右侧（属性 + 页面设置） */}
              <div className={styles.right}>Right</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
