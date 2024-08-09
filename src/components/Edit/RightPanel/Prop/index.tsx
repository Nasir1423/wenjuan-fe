import { getPropComponentByInfo } from '@/components/QuestionComponents';
import useGetComponentsData from '@/hooks/useGetComponentsData';
import { FC } from 'react';

const Prop: FC = () => {
  const { selectedComponent: selectedComponentInfo } = useGetComponentsData();

  return (
    <div>
      {selectedComponentInfo ? (
        getPropComponentByInfo(selectedComponentInfo)
      ) : (
        <h2>未选中任何组件</h2>
      )}
    </div>
  );
};

export default Prop;
