import { FC } from 'react';
import { useTitle } from 'ahooks';
import EditCanvas from '@/components/Edit/Canvas';
import styles from './index.module.scss';
import useLoadQuestionData from '@/hooks/useLoadQuestionData';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '@/store/components';
import LeftPanel from '@/components/Edit/LeftPanel';
import RightPanel from '@/components/Edit/RightPanel';
import Header from '@/components/Edit/Header';
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress';

const Edit: FC = () => {
  useTitle('问卷星 - 编辑问卷');
  const { loading } = useLoadQuestionData(); // 加载问卷数据
  useBindCanvasKeyPress(); // 引入快捷操作
  const dispatch = useDispatch();
  const clearSelectedId = () => {
    dispatch(changeSelectedId(''));
  };

  return (
    <div className={styles.container}>
      {/* Header - 工具栏 */}
      <div className={styles.header}>
        <Header />
      </div>
      {/* Content */}
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          {/* 左侧（组件库 + 图层） */}
          <div className={styles.left}>
            <LeftPanel />
          </div>
          {/* 中间（画布） */}
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <div className={styles.canvas}>
                <EditCanvas loading={loading} />
              </div>
            </div>
          </div>
          {/* 右侧（属性 + 页面设置） */}
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
