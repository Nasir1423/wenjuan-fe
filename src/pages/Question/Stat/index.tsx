import { FC, useState } from 'react';
import { useTitle } from 'ahooks';
import useLoadingData from '@/hooks/useLoadQuestionData';
import useGetPageInfo from '@/hooks/useGetPageInfo';
import { Button, Result, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import Header from '@/components/Stat/Header';
import ComponentList from '@/components/Stat/ComponentList';
import PageStat from '@/components/Stat/PageStat';
import ChartStat from '@/components/Stat/ChartStat';

const Stat: FC = () => {
  useTitle('问卷星 - 问卷数据');
  const { loading } = useLoadingData();
  const { isPublished } = useGetPageInfo();
  const nav = useNavigate();

  /* 选中的组件 id 和 type，被统计页面的主体的左、中、右三部分所共享 */
  const [selectedComponentId, setSelectedComponentId] = useState('');
  const [selectedComponentType, setSelectedComponentType] = useState('');

  // 当 isPublished 被赋值 & isPublished = false 时，要显示警告信息
  const isShowWarning = typeof isPublished === 'boolean' && !isPublished;

  // 加载中 - JSX
  const loadingElem = (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Spin />
    </div>
  );

  // 问卷未发布 - JSX
  const warningElem = (
    <div style={{ flex: '1' }}>
      <Result
        status="warning"
        title="该页面尚未发布"
        extra={
          <Button type="primary" onClick={() => nav(-1)}>
            返回
          </Button>
        }
      ></Result>
    </div>
  );

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentWrapper}>
        {loading && loadingElem}
        <div className={styles.content}>
          {!loading && isShowWarning && warningElem}
          {!loading && !isShowWarning && (
            <>
              <div className={styles.left}>
                <ComponentList
                  selectedComponentId={selectedComponentId}
                  setSelectedComponentId={setSelectedComponentId}
                  setSelectedComponentType={setSelectedComponentType}
                />
              </div>
              <div className={styles.main}>
                <PageStat
                  selectedComponentId={selectedComponentId}
                  setSelectedComponentId={setSelectedComponentId}
                  setSelectedComponentType={setSelectedComponentType}
                />
              </div>
              <div className={styles.right}>
                <ChartStat
                  selectedComponentId={selectedComponentId}
                  selectedComponentType={selectedComponentType}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stat;
