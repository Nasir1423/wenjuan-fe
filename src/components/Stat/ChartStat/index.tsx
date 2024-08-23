import { getStateComponentByType } from '@/components/QuestionComponents';
import { getComponentStatService } from '@/service/stat';
import { useRequest } from 'ahooks';
import { Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props;
  const { id: questionId = '' } = useParams();
  const [statData, setStatData] = useState([]); // 用于绘制图表的统计数据
  const { run: loadStatData } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(data) {
        setStatData(data.stat);
      },
    }
  );

  useEffect(() => {
    selectedComponentId && loadStatData(questionId, selectedComponentId);
  }, [loadStatData, questionId, selectedComponentId]);

  return (
    <>
      <Title level={3}>图表统计</Title>
      {!selectedComponentId && <div>未选中组件</div>}
      {selectedComponentId &&
        getStateComponentByType({ stat: statData, type: selectedComponentType })}
    </>
  );
};

export default ChartStat;
